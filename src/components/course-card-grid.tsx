import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/data';
import { cn } from '@/lib/utils';

export function CourseCardGrid({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden shadow-card transition-transform duration-300 hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Link href={`/courses/${course.id}`}>
          <Image
            src={course.imageUrl}
            alt={course.title}
            width={600}
            height={400}
            className="w-full h-auto aspect-[3/2] object-cover"
            data-ai-hint="course thumbnail"
          />
        </Link>
        <Badge className="absolute top-4 left-4 bg-white text-primary hover:bg-white">
          {course.category}
        </Badge>
        <div className="absolute top-4 right-4 bg-white text-primary font-bold text-lg rounded-md px-3 py-1">
          ${course.price}
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Image
            src={course.instructor.avatarUrl}
            alt={course.instructor.name}
            width={40}
            height={40}
            className="rounded-full"
            data-ai-hint="instructor avatar"
          />
          <div>
            <p className="font-semibold text-sm">{course.instructor.name}</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>
        <Link href={`/courses/${course.id}`}>
          <h3 className="font-headline text-lg font-bold text-primary hover:text-accent h-14">
            {course.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-bold text-sm">{course.rating.toFixed(1)}</span>
          </div>
          <span className="text-sm">({course.reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>{course.lessons} Lessons</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>{course.studentCount} Students</span>
        </div>
      </CardFooter>
    </Card>
  );
}
