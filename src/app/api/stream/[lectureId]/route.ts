import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { getLessonWithCourse } from '@/db/queries/lessons';
import { getUserEnrollment } from '@/db/queries/courses';
import { drive } from '@/lib/drive';

// In-memory rate limiting map: userId -> { count: number, resetTime: number }
// Note: MVP rate limiting. Recommend Redis for production.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 100; // max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(userId: string): boolean {
    const now = Date.now();
    const userLimit = rateLimitMap.get(userId);

    if (!userLimit || now >= userLimit.resetTime) {
        rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (userLimit.count >= RATE_LIMIT_MAX) {
        return true;
    }

    userLimit.count += 1;
    return false;
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ lectureId: string }> }
) {
    try {
        // 1. Auth check
        const session = await auth.getSession();
        if (!session || !(session as any).data?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const userId = (session as any).data.user.id;

        // 2. Rate limiting check
        if (isRateLimited(userId)) {
            return new NextResponse('Too Many Requests', { status: 429 });
        }

        // 3. Database validation Check if lesson exists
        const { lectureId } = await params;
        const lessonData = await getLessonWithCourse(lectureId);

        if (!lessonData) {
            return new NextResponse('Lesson Not Found', { status: 404 });
        }

        const { lesson, course } = lessonData;

        // Ensure we have a drive API ID to stream
        if (!lesson.driveVideoId) {
            return new NextResponse('Video not configured for this lesson', { status: 404 });
        }

        // 4. Enrollment Check (allow if free preview)
        if (!lesson.isFreePreview) {
            const isEnrolled = await getUserEnrollment(userId, course.id);
            // Skip enrollment check if user is the instructor
            const isInstructor = course.instructorId === userId;

            if (!isEnrolled && !isInstructor) {
                return new NextResponse('Forbidden: Not enrolled', { status: 403 });
            }
        }

        // 5. Proxy Stream from Google Drive
        const fileId = lesson.driveVideoId;
        const rangeHeader = req.headers.get('range');

        // Fetch file metadata to get total size if range is requested
        let fileSize: string | undefined;
        if (rangeHeader) {
            const metaResponse = await drive.files.get({
                fileId,
                fields: 'size',
            });
            fileSize = metaResponse.data.size ?? undefined;
        }


        // Request stream from Drive
        const driveResponse = await drive.files.get(
            {
                fileId,
                alt: 'media',
            },
            {
                responseType: 'stream',
                headers: rangeHeader ? { Range: rangeHeader } : undefined,
            }
        );

        // Map Node.js Readable stream line to Web Streams API
        const nodeStream = driveResponse.data as any; // Cast to bypass typing issue with GaxiosResponse

        const webStream = new ReadableStream({
            start(controller) {
                nodeStream.on('data', (chunk: Buffer) => {
                    controller.enqueue(chunk);
                });
                nodeStream.on('end', () => {
                    controller.close();
                });
                nodeStream.on('error', (err: any) => {
                    console.error('[DRIVE_STREAM_ERROR]', err);
                    controller.error(err);
                });
            },
            cancel() {
                nodeStream.destroy();
            },
        });

        // 6. Forward headers
        const headers = new Headers();

        // Always pass through basic response headers from drive
        const driveHeaders = driveResponse.headers as unknown as Record<string, string>;

        if (driveHeaders['content-type']) {
            headers.set('Content-Type', driveHeaders['content-type']);
        } else {
            headers.set('Content-Type', 'video/mp4'); // Default fallback
        }

        if (driveHeaders['content-length']) {
            headers.set('Content-Length', driveHeaders['content-length']);
        }

        headers.set('Accept-Ranges', 'bytes');
        headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');

        // If it was a partial request, make sure to forward Content-Range and set status 206
        let status = 200;
        if (rangeHeader && driveHeaders['content-range']) {
            headers.set('Content-Range', driveHeaders['content-range']);
            status = 206;
        }

        return new NextResponse(webStream, {
            status,
            headers,
        });

    } catch (error: any) {
        console.error('[STREAM_GET]', error);

        // Handle explicit Google Drive errors (e.g., 404, 403)
        if (error.code && typeof error.code === 'number') {
            return new NextResponse(`Drive API Error: ${error.message}`, { status: error.code });
        }

        return new NextResponse('Internal Error', { status: 500 });
    }
}
