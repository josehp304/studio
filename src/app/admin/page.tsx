import { db } from "@/db";
import { courses, users, modules, lessons, enrollments } from "@/db/schema";
import { count } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Layers, PlayCircle, ClipboardList } from "lucide-react";

export default async function AdminDashboardPage() {
    const [coursesCount, usersCount, modulesCount, lessonsCount, enrollmentsCount] = await Promise.all([
        db.select({ count: count() }).from(courses),
        db.select({ count: count() }).from(users),
        db.select({ count: count() }).from(modules),
        db.select({ count: count() }).from(lessons),
        db.select({ count: count() }).from(enrollments),
    ]);

    const stats = [
        { title: "Total Users", value: usersCount[0].count, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
        { title: "Total Courses", value: coursesCount[0].count, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-100" },
        { title: "Total Modules", value: modulesCount[0].count, icon: Layers, color: "text-amber-600", bg: "bg-amber-100" },
        { title: "Total Lessons", value: lessonsCount[0].count, icon: PlayCircle, color: "text-rose-600", bg: "bg-rose-100" },
        { title: "Enrollments", value: enrollmentsCount[0].count, icon: ClipboardList, color: "text-emerald-600", bg: "bg-emerald-100" },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">Welcome to the central command for your LMS.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <Card key={stat.title} className="hover:shadow-lg transition-shadow border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-full ${stat.bg}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
