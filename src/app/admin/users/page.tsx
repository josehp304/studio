import { db } from "@/db";
import { users } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default async function AdminUsersPage() {
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Users</h1>
                <Button asChild>
                    <Link href="/admin/users/new">
                        <Plus className="mr-2 h-4 w-4" /> New User
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-mono text-xs max-w-[100px] truncate">{user.id}</TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' :
                                            user.role === 'INSTRUCTOR' ? 'bg-secondary text-secondary-foreground' :
                                                'bg-muted text-muted-foreground'}`}>
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell>{user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "N/A"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/users/${user.id}`}>
                                            <Pen className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
