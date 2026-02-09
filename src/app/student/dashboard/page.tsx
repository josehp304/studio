
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardCourseCard } from "@/components/dashboard/dashboard-course-card";
import { RecentActivityList } from "@/components/dashboard/recent-activity-list";
import { studentData } from "@/lib/dummy-data";
import { BookOpen, Award, Heart, Trophy } from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value={studentData.stats.enrolledCourses}
          icon={BookOpen}
          description="2 courses in progress"
        />
        <StatCard
          title="Certificates"
          value={studentData.stats.certificates}
          icon={Award}
          description="Earned so far"
        />
        <StatCard
          title="Wishlist"
          value={studentData.stats.wishlist}
          icon={Heart}
          description="Saved courses"
        />
        <StatCard
          title="Total Points"
          value={studentData.stats.totalPoints}
          icon={Trophy}
          description="Learning achievements"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
          <div className="space-y-4">
            {studentData.enrolledCourses.map((course) => (
              <DashboardCourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
           <RecentActivityList activities={studentData.recentActivity} />
        </div>
      </div>
    </div>
  );
}
