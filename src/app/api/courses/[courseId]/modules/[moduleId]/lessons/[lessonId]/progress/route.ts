import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { updateLessonProgress } from '@/db/queries/progress';
import { z } from 'zod';

const progressSchema = z.object({
    isCompleted: z.boolean()
});

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string; moduleId: string; lessonId: string }> }
) {
    try {
        const session = await auth.getSession();
        if (!session || !(session as any).data?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // We don't necessarily need courseId/moduleId for the update, just lessonId
        // But keeping the URL structure for RESTfulness
        const { lessonId } = await params;
        const body = await req.json();
        const { isCompleted } = progressSchema.parse(body);

        const result = await updateLessonProgress((session as any).data.user.id, lessonId, isCompleted);

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error('[LESSON_PROGRESS_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
