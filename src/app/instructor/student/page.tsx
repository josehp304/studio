
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function StudentPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Students</CardTitle>
      </CardHeader>
      <CardContent>
        <p>View and manage all students enrolled in your courses.</p>
      </CardContent>
    </Card>
  );
}
