
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { BlogComments } from "@/components/blog-comments";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-16">
      {/* Header Section */}
       <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>-</span>
            <span className="text-primary font-medium">Details</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold max-w-4xl mx-auto">{post.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-md">
           <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b mb-8">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                         <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                </div>
                 <Badge variant="secondary" className="text-primary bg-primary/10 hover:bg-primary/20">{post.category}</Badge>
            </div>

            <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 hover:text-blue-600 hover:border-blue-600">
                    <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 hover:text-sky-500 hover:border-sky-500">
                    <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 hover:text-blue-700 hover:border-blue-700">
                    <Linkedin className="h-4 w-4" />
                </Button>
                 <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
                    <LinkIcon className="h-4 w-4" />
                </Button>
            </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
             
             {post.content === "..." && (
                <>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <h3>Key Takeaways</h3>
                    <p>
                        Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.
                    </p>
                    <ul>
                        <li>Understanding the core concepts is crucial.</li>
                        <li>Practice makes perfect in development and design.</li>
                        <li>Always stay updated with the latest trends.</li>
                    </ul>
                    <p>
                        Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Morbi nec metus.
                    </p>
                </>
             )}
        </div>

        <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="px-3 py-1 text-sm bg-muted/50 hover:bg-muted font-normal cursor-pointer">
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>

        <BlogComments blogId={post.id} />
        
        <div className="mt-8">
             <Link href="/blog">
                <Button variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Button>
             </Link>
        </div>
      </div>
    </div>
  );
}
