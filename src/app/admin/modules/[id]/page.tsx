import { db } from "@/db";
import { modules } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminForm } from "../../components/admin-form";

export default async function AdminModulesIdPage({ params }: { params: { id: string } }) {
    let initialData = {};
    if (params.id !== 'new') {
        const data = await db.select().from(modules).where(eq(modules.id, params.id));
        initialData = data[0] || {};
    }

    const fields = [
        { name: "courseId", label: "Course ID", type: "text" },
        { name: "title", label: "Title", type: "text" },
        { name: "position", label: "Position", type: "number" },
        { name: "isPublished", label: "Is Published?", type: "boolean" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Module</h1>
            <AdminForm table="modules" id={params.id} initialData={initialData} fields={fields as any} />
        </div>
    );
}
