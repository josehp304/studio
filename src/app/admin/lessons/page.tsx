import { db } from "@/db";
import { lessons, modules } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import { format } from "date-fns";

export default async function AdminLessonsPage() {
    const allLessons = await db.select({
        id: lessons.id,
        title: lessons.title,
        moduleTitle: modules.title,
        position: lessons.position,
        isPublished: lessons.isPublished,
        isFreePreview: lessons.isFreePreview,
        createdAt: lessons.createdAt
    })
        .from(lessons)
        .leftJoin(modules, eq(lessons.moduleId, modules.id))
        .orderBy(desc(lessons.createdAt));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Lessons</h1>
                <Button asChild>
                    <Link href="/admin/lessons/new">
                        <Plus className="mr-2 h-4 w-4" /> New Lesson
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Title</TableHead>
                            <TableHead>Module</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Free Preview</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allLessons.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                                    No lessons found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allLessons.map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell className="font-medium">{lesson.title}</TableCell>
                                <TableCell>{lesson.moduleTitle || 'Unknown Module'}</TableCell>
                                <TableCell>{lesson.position}</TableCell>
                                <TableCell>{lesson.isPublished ? "Yes" : "No"}</TableCell>
                                <TableCell>{lesson.isFreePreview ? "Yes" : "No"}</TableCell>
                                <TableCell>{lesson.createdAt ? format(new Date(lesson.createdAt), "MMM d, yyyy") : "N/A"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/lessons/${lesson.id}`}>
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
