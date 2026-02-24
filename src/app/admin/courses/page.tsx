import { db } from "@/db";
import { courses } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default async function AdminCoursesPage() {
    const allCourses = await db.select().from(courses).orderBy(desc(courses.createdAt));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Courses</h1>
                <Button asChild>
                    <Link href="/admin/courses/new">
                        <Plus className="mr-2 h-4 w-4" /> New Course
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Published</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allCourses.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No courses found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allCourses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell className="font-medium">{course.title}</TableCell>
                                <TableCell>${((course.price || 0) / 100).toFixed(2)}</TableCell>
                                <TableCell>{course.isPublished ? "Yes" : "No"}</TableCell>
                                <TableCell>{course.createdAt ? format(new Date(course.createdAt), "MMM d, yyyy") : "N/A"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/courses/${course.id}`}>
                                            <Pen className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    {/* Delete can be an action button - omitted for brevity but needed by real admin app */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
