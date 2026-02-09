
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { courseCategories } from "@/lib/dummy-data";

export default function CourseCategoriesPage() {
  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Course Categories</h1>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <span className="text-primary font-medium">Course Categories</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Search Banner */}
        <div className="bg-card border rounded-xl p-8 mb-12 shadow-sm relative overflow-hidden">
             <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Browse by Categories</h2>
                        <p className="text-muted-foreground text-lg">
                            Take the first step towards achieving your goals with our comprehensive courses.
                        </p>
                    </div>
                    
                    <div className="flex w-full max-w-lg items-center space-x-2 bg-background p-1.5 border rounded-full shadow-sm">
                        <Input 
                            type="text" 
                            placeholder="Search School, Online educational centres, etc" 
                            className="border-none shadow-none focus-visible:ring-0 pl-4 h-12 rounded-l-full"
                        />
                        <Button type="submit" size="lg" className="rounded-full h-12 px-8 bg-[#2d1b69] hover:bg-[#201350]">
                            Search
                        </Button>
                    </div>
                </div>
                {/* Image Placeholder - simulating the person image in the banner */}
                <div className="hidden md:flex justify-end relative h-64 w-full">
                     <div className="absolute right-0 bottom-[-32px] w-64 h-64 rounded-full bg-green-500 z-0"></div>
                     <Image 
                        src="https://picsum.photos/seed/happy-student/300/400" 
                        alt="Happy Student" 
                        width={300} 
                        height={400}
                        className="relative z-10 object-contain drop-shadow-xl"
                        style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                     />
                </div>
             </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courseCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm cursor-pointer group">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <CardContent className="text-center p-6">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{category.title}</h3>
                        <p className="text-muted-foreground text-sm underline decoration-muted-foreground/30 underline-offset-4">{category.lessons} Lessons</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
