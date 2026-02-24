import { db } from "../index";
import { lessons, modules, courses } from "../schema";
import { eq } from "drizzle-orm";

export async function getLessonWithCourse(lessonId: string) {
    const result = await db
        .select({
            lesson: lessons,
            module: modules,
            course: courses,
        })
        .from(lessons)
        .innerJoin(modules, eq(lessons.moduleId, modules.id))
        .innerJoin(courses, eq(modules.courseId, courses.id))
        .where(eq(lessons.id, lessonId))
        .limit(1);

    return result.length > 0 ? result[0] : null;
}
