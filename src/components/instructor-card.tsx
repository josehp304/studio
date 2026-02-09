import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Heart, CheckCircle } from 'lucide-react';
import type { FeaturedInstructor } from '@/lib/data';

export function InstructorCard({ instructor }: { instructor: FeaturedInstructor }) {
  return (
    <Card className="text-center group overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="relative">
        <Image
          src={instructor.avatarUrl}
          alt={instructor.name}
          width={300}
          height={300}
          className="w-full object-cover aspect-square"
          data-ai-hint="instructor portrait"
        />
        {instructor.isVerified && (
          <div className="absolute top-3 left-3 bg-white rounded-full p-1">
            <CheckCircle className="w-5 h-5 text-green-500 fill-green-100" />
          </div>
        )}
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm rounded-full text-muted-foreground hover:text-rose-500 hover:bg-white">
            <Heart className="w-5 h-5" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-headline text-lg font-bold text-primary">{instructor.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{instructor.role}</p>
        <div className="flex justify-center items-center gap-1 text-amber-500">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-bold text-sm">{instructor.rating.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
