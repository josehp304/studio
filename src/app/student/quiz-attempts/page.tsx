
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
import { studentData } from "@/lib/dummy-data";

export default function QuizAttemptsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quiz Attempts</h1>
        <p className="text-muted-foreground">History of quizzes you have taken.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Attempts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.quizAttempts.map((attempt: any) => (
                <TableRow key={attempt.id}>
                  <TableCell className="font-medium">{attempt.quiz}</TableCell>
                  <TableCell>{attempt.course}</TableCell>
                  <TableCell>
                    {attempt.score}/{attempt.totalQuestions}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={attempt.status === "Passed" ? "default" : "destructive"}
                    >
                      {attempt.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{attempt.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
