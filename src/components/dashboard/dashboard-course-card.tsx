
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface DashboardCourseCardProps {
  course: {
    id: number;
    title: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    image: string;
    lastAccessed: string;
  };
}

export function DashboardCourseCard({ course }: DashboardCourseCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="flex-1 p-4 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold line-clamp-1">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.instructor}</p>
            </div>
            <Link href={`/student/courses/${course.id}`}>
               <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <PlayCircle className="h-5 w-5" />
                  <span className="sr-only">Resume Course</span>
               </Button>
            </Link>
          </div>
          <div className="space-y-1">
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>{course.progress}% Complete</span>
                <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
             </div>
             <Progress value={course.progress} className="h-2" />
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
            Last accessed: {course.lastAccessed}
        </div>
      </CardContent>
    </Card>
  );
}
