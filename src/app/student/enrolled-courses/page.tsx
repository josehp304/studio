
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function EnrolledCoursesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Here are the courses you are currently enrolled in.</p>
      </CardContent>
    </Card>
  );
}
