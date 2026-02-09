
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Section */}
      <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Blog</h1>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <span className="text-primary font-medium">Blog</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="break-inside-avoid">
              <Link href={`/blog/${post.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative w-full">
                    {/* Aspect ratio handling by not setting fixed height, let image dictate or use style */}
                     <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground hover:bg-primary/90">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-6 pb-2">
                    <h2 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 pb-4 flex-grow">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex justify-between items-center text-xs text-muted-foreground mt-auto">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                             <Clock className="h-3 w-3" />
                             {post.readTime}
                        </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
