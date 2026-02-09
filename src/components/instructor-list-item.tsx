
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, BookOpen, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InstructorProps {
  instructor: {
    id: number;
    name: string;
    role: string;
    image: string;
    rating: number;
    reviews: number;
    coursesCount: number;
    duration: string;
    studentsCount: number;
    bio: string;
    tags: string[];
  };
}

export function InstructorListItem({ instructor }: InstructorProps) {
  return (
    <Card className="overflow-hidden mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 lg:w-1/4 relative min-h-[200px] md:min-h-0">
          <Image
            src={instructor.image}
            alt={instructor.name}
            fill
            className="object-cover"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white text-muted-foreground hover:text-red-500"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col h-full justify-between gap-4">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold hover:text-primary cursor-pointer">
                    {instructor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{instructor.role}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold text-sm">{instructor.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({instructor.reviews} Reviews)
                  </span>
                </div>
              </div>
              <p className="mt-3 text-muted-foreground text-sm line-clamp-2">
                {instructor.bio}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-red-500" />
                  <span>{instructor.coursesCount}+ Lesson</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-800" />
                  <span>{instructor.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-pink-500" />
                  <span>{instructor.studentsCount} Students</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {instructor.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-md font-normal">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
