import { db } from "@/db";
import { userProgress, lessons, modules, courses } from "@/db/schema";
import { and, eq, count } from "drizzle-orm";

export async function getUserProgress(userId: string, courseId: string) {
    // Get all published lesson IDs for the course
    // Ideally we'd do a join but for now let's query lessons first
    // Actually, we can just get progress for specific lessons if needed.
    // Or return map of lessonId -> isCompleted

    // 1. Get all modules -> lessons for course
    const courseModules = await db.query.modules.findMany({
        where: (modules, { eq }) => eq(modules.courseId, courseId),
        with: {
            lessons: true
        }
    });

    const lessonIds = courseModules.flatMap((m: any) => m.lessons.map((l: any) => l.id));

    if (lessonIds.length === 0) return { completedCount: 0, totalCount: 0, progressMap: {} };

    // 2. Get progress for these lessons
    // using 'inArray' if array is not empty
    const progress = await db.query.userProgress.findMany({
        where: (progress, { and, eq, inArray }) => and(
            eq(progress.userId, userId),
            inArray(progress.lessonId, lessonIds)
        )
    });

    const progressMap = progress.reduce((acc, curr: any) => {
        if (curr.lessonId) {
            acc[curr.lessonId] = curr.isCompleted || false;
        }
        return acc;
    }, {} as Record<string, boolean>);

    const completedCount = progress.filter(p => p.isCompleted).length;

    return {
        completedCount,
        totalCount: lessonIds.length,
        progressMap
    };
}

export async function updateLessonProgress(userId: string, lessonId: string, isCompleted: boolean) {
    // Upsert progress
    return await db.insert(userProgress).values({
        userId,
        lessonId,
        isCompleted,
        lastWatchedAt: new Date()
    }).onConflictDoUpdate({
        target: [userProgress.userId, userProgress.lessonId],
        set: { isCompleted, lastWatchedAt: new Date() }
    }).returning();
}
