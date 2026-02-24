import { db } from "@/db";
import { modules, courses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import { format } from "date-fns";

export default async function AdminModulesPage() {
    // Join to get course title
    const allModules = await db.select({
        id: modules.id,
        title: modules.title,
        courseTitle: courses.title,
        position: modules.position,
        isPublished: modules.isPublished,
        createdAt: modules.createdAt
    })
        .from(modules)
        .leftJoin(courses, eq(modules.courseId, courses.id))
        .orderBy(desc(modules.createdAt));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Modules</h1>
                <Button asChild>
                    <Link href="/admin/modules/new">
                        <Plus className="mr-2 h-4 w-4" /> New Module
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Title</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allModules.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No modules found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allModules.map((module) => (
                            <TableRow key={module.id}>
                                <TableCell className="font-medium">{module.title}</TableCell>
                                <TableCell>{module.courseTitle || 'Unknown Course'}</TableCell>
                                <TableCell>{module.position}</TableCell>
                                <TableCell>{module.isPublished ? "Yes" : "No"}</TableCell>
                                <TableCell>{module.createdAt ? format(new Date(module.createdAt), "MMM d, yyyy") : "N/A"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/modules/${module.id}`}>
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
