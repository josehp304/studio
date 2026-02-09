
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { instructorData } from "@/lib/dummy-data";
import { Edit, Trash2, Plus, FileText } from "lucide-react";

export default function InstructorAssignmentPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">Manage assignments for your courses.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructorData.assignments.map((assignment: any) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {assignment.title}
                  </TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>{assignment.submissions}</TableCell>
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
