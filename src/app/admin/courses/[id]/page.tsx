import { db } from "@/db";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminForm } from "../../components/admin-form";

export default async function AdminCoursesIdPage({ params }: { params: { id: string } }) {
    let initialData = {};
    if (params.id !== 'new') {
        const data = await db.select().from(courses).where(eq(courses.id, params.id));
        initialData = data[0] || {};
    }

    const fields = [
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "text" },
        { name: "thumbnailUrl", label: "Thumbnail URL", type: "text" },
        { name: "price", label: "Price (cents)", type: "number" },
        { name: "instructorId", label: "Instructor ID", type: "text" },
        { name: "isPublished", label: "Is Published?", type: "boolean" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Course</h1>
            <AdminForm table="courses" id={params.id} initialData={initialData} fields={fields as any} />
        </div>
    );
}
