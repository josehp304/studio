import { db } from "@/db";
import { enrollments, users, courses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import { format } from "date-fns";

export default async function AdminEnrollmentsPage() {
    const allEnrollments = await db.select({
        id: enrollments.id,
        userName: users.name,
        userEmail: users.email,
        courseTitle: courses.title,
        enrolledAt: enrollments.enrolledAt
    })
        .from(enrollments)
        .leftJoin(users, eq(enrollments.userId, users.id))
        .leftJoin(courses, eq(enrollments.courseId, courses.id))
        .orderBy(desc(enrollments.enrolledAt));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Enrollments</h1>
                <Button asChild>
                    <Link href="/admin/enrollments/new">
                        <Plus className="mr-2 h-4 w-4" /> New Enrollment
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-card text-card-foreground shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>User</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Enrolled At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allEnrollments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                    No enrollments found.
                                </TableCell>
                            </TableRow>
                        )}
                        {allEnrollments.map((enrollment) => (
                            <TableRow key={enrollment.id}>
                                <TableCell className="font-medium">
                                    <div>{enrollment.userName || 'Unknown'}</div>
                                    <div className="text-xs text-muted-foreground font-normal">{enrollment.userEmail}</div>
                                </TableCell>
                                <TableCell>{enrollment.courseTitle || 'Unknown Course'}</TableCell>
                                <TableCell>{enrollment.enrolledAt ? format(new Date(enrollment.enrolledAt), "MMM d, yyyy") : "N/A"}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/admin/enrollments/${enrollment.id}`}>
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
