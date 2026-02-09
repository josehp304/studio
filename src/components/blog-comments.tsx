
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { blogComments } from "@/lib/dummy-data";
import { MessageSquare } from "lucide-react";

interface Comment {
  id: number;
  blogId: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

interface BlogCommentsProps {
  blogId: number;
}

export function BlogComments({ blogId }: BlogCommentsProps) {
  const comments = blogComments.filter((c: Comment) => c.blogId === blogId);

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-10 bg-muted/30 p-6 rounded-lg">
        <h4 className="font-semibold mb-4">Leave a Comment</h4>
        <div className="grid gap-4">
          <Textarea placeholder="Write your thoughts here..." className="bg-background min-h-[100px]" />
          <div className="flex justify-end">
            <Button>Post Comment</Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length > 0 ? (
          comments.map((comment: Comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-sm">{comment.author}</h5>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comment.content}
                </p>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs text-muted-foreground hover:text-primary">
                  Reply
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No comments yet. Be the first to start the conversation!
          </p>
        )}
      </div>
    </div>
  );
}
