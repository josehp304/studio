import { db } from "@/db";
import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminForm } from "../../components/admin-form";

export default async function AdminLessonsIdPage({ params }: { params: { id: string } }) {
    let initialData = {};
    if (params.id !== 'new') {
        const data = await db.select().from(lessons).where(eq(lessons.id, params.id));
        initialData = data[0] || {};
    }

    const fields = [
        { name: "moduleId", label: "Module ID", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "text" },
        { name: "videoUrl", label: "Video URL", type: "text" },
        { name: "position", label: "Position", type: "number" },
        { name: "isPublished", label: "Is Published?", type: "boolean" },
        { name: "isFreePreview", label: "Is Free Preview?", type: "boolean" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Lesson</h1>
            <AdminForm table="lessons" id={params.id} initialData={initialData} fields={fields as any} />
        </div>
    );
}
