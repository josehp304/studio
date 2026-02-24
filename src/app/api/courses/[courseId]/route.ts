import { NextResponse } from 'next/server';
import { getCourseById } from '@/db/queries/courses';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { courseId } = await params;

        // Validate UUID format manually or assume database query handles it (returns null)
        // Drizzle uuid type checking might throw if invalid input, so better to validate or let query fail gracefully

        const course = await getCourseById(courseId);

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(course);
    } catch (error) {
        console.error('[COURSE_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
