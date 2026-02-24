import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardCourseCard } from "@/components/dashboard/dashboard-course-card";
import { RecentActivityList } from "@/components/dashboard/recent-activity-list";
import { BookOpen, Award, Heart, Trophy } from "lucide-react";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { enrollments, courses, users } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";

export default async function StudentDashboardPage() {
  const { data } = await auth.getSession();

  if (!data?.session || !data?.user) {
    return redirect("/login");
  }

  const userId = data.user.id;

  // Fetch enrolled courses count
  const [enrollmentCount] = await db
    .select({ count: count() })
    .from(enrollments)
    .where(eq(enrollments.userId, userId));

  // Fetch enrolled courses details
  const enrolledCoursesData = await db
    .select({
      id: courses.id,
      title: courses.title,
      instructorName: users.name,
      thumbnailUrl: courses.thumbnailUrl,
      enrolledAt: enrollments.enrolledAt,
    })
    .from(enrollments)
    .innerJoin(courses, eq(enrollments.courseId, courses.id))
    .leftJoin(users, eq(courses.instructorId, users.id))
    .where(eq(enrollments.userId, userId))
    .orderBy(desc(enrollments.enrolledAt));

  // Transform data to match component expectation
  const formattedCourses = enrolledCoursesData.map(course => ({
    id: course.id,
    title: course.title,
    instructor: course.instructorName || "Unknown Instructor",
    progress: 0, // TODO: Implement progress tracking
    totalLessons: 0, // TODO: Fetch lesson count
    completedLessons: 0, // TODO: Fetch completed lesson count
    image: course.thumbnailUrl || "https://picsum.photos/seed/course-placeholder/600/400",
    lastAccessed: new Date(course.enrolledAt!).toLocaleDateString(),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {data.user.name}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Enrolled Courses"
          value={enrollmentCount.count}
          icon={BookOpen}
          description="Courses in progress"
        />
        <StatCard
          title="Certificates"
          value={0} // Placeholder
          icon={Award}
          description="Earned so far"
        />
        <StatCard
          title="Wishlist"
          value={0} // Placeholder
          icon={Heart}
          description="Saved courses"
        />
        <StatCard
          title="Total Points"
          value={0} // Placeholder
          icon={Trophy}
          description="Learning achievements"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">Continue Learning</h2>
          {formattedCourses.length > 0 ? (
            <div className="space-y-4">
              {formattedCourses.map((course: any) => (
                <DashboardCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 border rounded-lg bg-muted/20">
              <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
            </div>
          )}
        </div>
        <div className="space-y-6">
          {/* Placeholder for recent activity as we don't have a table for it yet */}
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-col gap-1">
              <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Your latest actions.</p>
            </div>
            <div className="p-6 pt-0">
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
