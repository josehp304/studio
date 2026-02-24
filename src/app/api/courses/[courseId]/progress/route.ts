import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { getUserProgress } from '@/db/queries/progress';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const session = await auth.getSession();
        if (!session || !(session as any).data?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { courseId } = await params;
        const progress = await getUserProgress((session as any).data.user.id, courseId);

        return NextResponse.json(progress);
    } catch (error) {
        console.error('[COURSE_PROGRESS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
