
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentSalesList } from "@/components/dashboard/recent-sales-list";
import { instructorData } from "@/lib/dummy-data";
import { BookOpen, Users, DollarSign, Star } from "lucide-react";

export default function InstructorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${instructorData.stats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <StatCard
          title="Total Students"
          value={instructorData.stats.totalStudents.toLocaleString()}
          icon={Users}
          description="+180 new students"
        />
        <StatCard
          title="Total Courses"
          value={instructorData.stats.totalCourses}
          icon={BookOpen}
          description="+2 new courses"
        />
        <StatCard
          title="Average Rating"
          value={instructorData.stats.averageRating}
          icon={Star}
          description={`Based on ${instructorData.stats.totalReviews} reviews`}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
           {/* Placeholder for a Chart or more detailed stats */}
           <div className="bg-muted/50 border rounded-xl h-[400px] flex items-center justify-center text-muted-foreground">
              Revenue Chart Placeholder
           </div>
        </div>
        <div className="col-span-3">
          <RecentSalesList sales={instructorData.recentSales} />
        </div>
      </div>
    </div>
  );
}
