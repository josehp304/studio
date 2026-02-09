
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { instructorData } from "@/lib/dummy-data";
import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";

export default function InstructorCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">Manage your courses, lectures and quizzes.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Course Info</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructorData.courses.map((course: any) => (
                <TableRow key={course.id}>
                  <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                            src={course.image}
                            alt={course.title}
                            width={64}
                            height={40}
                            className="rounded object-cover"
                        />
                        <div className="font-medium line-clamp-2">{course.title}</div>
                      </div>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>{course.rating}</TableCell>
                  <TableCell>${course.revenue}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
