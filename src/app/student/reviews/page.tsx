
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { studentData } from "@/lib/dummy-data";
import { Star } from "lucide-react";

export default function StudentReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
        <p className="text-muted-foreground">Reviews you have written for courses.</p>
      </div>

      <div className="grid gap-6">
        {studentData.reviews.map((review: any) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle className="text-lg font-medium hover:underline">
                {review.course}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p>{review.comment}</p>
              <p className="text-xs text-muted-foreground pt-2">
                Posted {review.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
