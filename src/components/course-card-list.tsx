import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Course } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function CourseCardList({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden shadow-card transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <Link href={`/courses/${course.id}`}>
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={600}
              height={400}
              className="w-full h-full object-cover"
              data-ai-hint="course thumbnail"
            />
          </Link>
        </div>
        <div className="md:w-2/3 flex flex-col">
          <CardContent className="p-6 space-y-3 flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{course.category}</p>
                <Link href={`/courses/${course.id}`}>
                  <h3 className="font-headline text-xl font-bold text-primary hover:text-accent mt-1">
                    {course.title}
                  </h3>
                </Link>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${course.price}</p>
                {course.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">${course.originalPrice}</p>
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm pt-2">
              Learn the essentials of {course.title.toLowerCase()} from our expert instructors. This course covers everything from basic principles to advanced techniques.
            </p>
            <div className="flex items-center gap-4 pt-2">
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
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-sm">{course.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground ml-1">({course.reviewCount})</span>
              </div>
            </div>
          </CardContent>
          <div className="p-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{course.studentCount} Students</span>
                </div>
            </div>
            <Button asChild size="lg" className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281] w-full sm:w-auto">
              <Link href={`/courses/${course.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
