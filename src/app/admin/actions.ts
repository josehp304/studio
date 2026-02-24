"use server";
import { db } from "@/db";
import { users, courses, modules, lessons, enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteEntity(table: string, id: string) {
    switch (table) {
        case 'users': await db.delete(users).where(eq(users.id, id)); break;
        case 'courses': await db.delete(courses).where(eq(courses.id, id)); break;
        case 'modules': await db.delete(modules).where(eq(modules.id, id)); break;
        case 'lessons': await db.delete(lessons).where(eq(lessons.id, id)); break;
        case 'enrollments': await db.delete(enrollments).where(eq(enrollments.id, id)); break;
    }
    revalidatePath(`/admin/${table}`);
}

export async function saveEntity(table: string, id: string | null, data: any) {
    if (id === 'new') id = null;

    switch (table) {
        case 'users':
            if (id) await db.update(users).set(data).where(eq(users.id, id));
            else await db.insert(users).values({ id: crypto.randomUUID(), ...data });
            break;
        case 'courses':
            // Map to correct types
            if (data.price) data.price = parseInt(data.price) || 0;
            if (data.isPublished !== undefined) data.isPublished = data.isPublished === 'true' || data.isPublished === true;
            if (id) await db.update(courses).set({ ...data, updatedAt: new Date() }).where(eq(courses.id, id));
            else await db.insert(courses).values(data);
            break;
        case 'modules':
            if (data.position) data.position = parseInt(data.position) || 0;
            if (data.isPublished !== undefined) data.isPublished = data.isPublished === 'true' || data.isPublished === true;
            if (id) await db.update(modules).set({ ...data, updatedAt: new Date() }).where(eq(modules.id, id));
            else await db.insert(modules).values(data);
            break;
        case 'lessons':
            if (data.position) data.position = parseInt(data.position) || 0;
            if (data.isPublished !== undefined) data.isPublished = data.isPublished === 'true' || data.isPublished === true;
            if (data.isFreePreview !== undefined) data.isFreePreview = data.isFreePreview === 'true' || data.isFreePreview === true;
            if (id) await db.update(lessons).set({ ...data, updatedAt: new Date() }).where(eq(lessons.id, id));
            else await db.insert(lessons).values(data);
            break;
        case 'enrollments':
            if (id) await db.update(enrollments).set(data).where(eq(enrollments.id, id));
            else await db.insert(enrollments).values(data);
            break;
    }
    revalidatePath(`/admin/${table}`);
}
