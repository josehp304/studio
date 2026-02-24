import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { enrollUserInCourse } from '@/db/queries/courses';
import { z } from 'zod';

const enrollmentSchema = z.object({
    courseId: z.string().uuid()
});

export async function POST(req: Request) {
    try {
        const session = await auth.getSession();
        if (!session || !(session as any).data?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { courseId } = enrollmentSchema.parse(body);

        const user = (session as any).data.user;

        // Ensure user exists in our DB wrapper before enrolling
        // Neon Auth might have created the user in `neon_auth` schema, but we need them in `public.users` too
        await import('@/db/index').then(async ({ db }) => {
            const { users } = await import('@/db/schema');
            const { eq } = await import('drizzle-orm');

            const existingUser = await db.query.users.findFirst({
                where: eq(users.id, user.id)
            });

            if (!existingUser) {
                await db.insert(users).values({
                    id: user.id,
                    email: user.email,
                    name: user.name || "Unknown User",
                });
            }
        });

        const enrollment = await enrollUserInCourse(user.id, courseId);

        return NextResponse.json(enrollment);
    } catch (error) {
        console.error('[ENROLLMENTS_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
