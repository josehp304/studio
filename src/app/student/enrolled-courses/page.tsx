
import { DashboardCourseCard } from "@/components/dashboard/dashboard-course-card";
import { studentData } from "@/lib/dummy-data";

export default function EnrolledCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Enrolled Courses</h1>
        <p className="text-muted-foreground">Manage your courses and track your progress.</p>
      </div>
      <div className="grid gap-6">
        {studentData.enrolledCourses.map((course) => (
          <DashboardCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
