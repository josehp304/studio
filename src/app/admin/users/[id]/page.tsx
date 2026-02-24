import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdminForm } from "../../components/admin-form";

export default async function AdminUsersIdPage({ params }: { params: { id: string } }) {
    let initialData = {};
    if (params.id !== 'new') {
        const data = await db.select().from(users).where(eq(users.id, params.id));
        initialData = data[0] || {};
    }

    const fields = [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "text" },
        {
            name: "role", label: "Role", type: "select", options: [
                { label: "Student", value: "STUDENT" },
                { label: "Instructor", value: "INSTRUCTOR" },
                { label: "Admin", value: "ADMIN" }
            ]
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage User</h1>
            <AdminForm table="users" id={params.id} initialData={initialData} fields={fields as any} />
        </div>
    );
}
