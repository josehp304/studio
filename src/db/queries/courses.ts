
import { db } from "../index";
import { courses, modules, lessons, enrollments, userProgress, users } from "../schema";
import { eq, and, desc, asc } from "drizzle-orm";

export async function getPublishedCourses(retries = 2, cooldown = 1000): Promise<any[]> {
    try {
        const records = await db.select({
            course: courses,
            instructor: users
        })
            .from(courses)
            .leftJoin(users, eq(courses.instructorId, users.id))
            .where(eq(courses.isPublished, true))
            .orderBy(desc(courses.createdAt));

        return records.map(record => ({
            ...record.course,
            instructor: record.instructor
        }));
    } catch (error) {
        if (retries > 0) {
            console.warn(`Query failed, retrying in ${cooldown}ms... (${retries} retries left)`);
            await new Promise(resolve => setTimeout(resolve, cooldown));
            return getPublishedCourses(retries - 1, cooldown * 2);
        }
        throw error;
    }
}

export async function getCourseById(courseId: string) {
    return await db.query.courses.findFirst({
        where: (courses, { eq }) => eq(courses.id, courseId),
        with: {
            instructor: true,
            modules: {
                where: (modules: any, { eq }: any) => eq(modules.isPublished, true),
                orderBy: (modules: any, { asc }: any) => [asc(modules.position)],
                with: {
                    lessons: {
                        where: (lessons: any, { eq }: any) => eq(lessons.isPublished, true),
                        orderBy: (lessons: any, { asc }: any) => [asc(lessons.position)]
                    }
                }
            }
        }
    });
}

export async function getUserEnrollment(userId: string, courseId: string) {
    return await db.query.enrollments.findFirst({
        where: (enrollments, { and, eq }) => and(
            eq(enrollments.userId, userId),
            eq(enrollments.courseId, courseId)
        )
    });
}

export async function enrollUserInCourse(userId: string, courseId: string) {
    // Check if valid course
    const course = await db.query.courses.findFirst({ where: eq(courses.id, courseId) });
    if (!course) throw new Error("Course not found");

    // Check existing enrollment
    const existing = await getUserEnrollment(userId, courseId);
    if (existing) return existing;

    const [enrollment] = await db.insert(enrollments).values({
        userId,
        courseId
    }).returning();

    return enrollment;
}
