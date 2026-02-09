
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WishlistPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <p>These are the courses you've saved for later.</p>
      </CardContent>
    </Card>
  );
}
