import { db } from "@/db";
import { enrollments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminForm } from "../../components/admin-form";

export default async function AdminEnrollmentsIdPage({ params }: { params: { id: string } }) {
    let initialData = {};
    if (params.id !== 'new') {
        const data = await db.select().from(enrollments).where(eq(enrollments.id, params.id));
        initialData = data[0] || {};
    }

    const fields = [
        { name: "userId", label: "User ID", type: "text" },
        { name: "courseId", label: "Course ID", type: "text" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Enrollment</h1>
            <AdminForm table="enrollments" id={params.id} initialData={initialData} fields={fields as any} />
        </div>
    );
}
