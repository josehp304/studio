
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { instructorData } from "@/lib/dummy-data";
import Link from "next/link";
import { Edit } from "lucide-react";

export default function InstructorProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Instructor Profile</h1>
        <Button asChild variant="outline">
            <Link href="/instructor/settings">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
            </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={instructorData.avatar} alt={instructorData.name} />
              <AvatarFallback>IP</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{instructorData.name}</h2>
            <p className="text-muted-foreground">{instructorData.email}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
                <Label className="text-muted-foreground">Biography</Label>
                <p className="mt-1">{instructorData.bio}</p>
             </div>
             <Separator />
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className="text-muted-foreground">Total Students</Label>
                    <p className="text-lg font-medium">{instructorData.stats.totalStudents}</p>
                </div>
                <div>
                    <Label className="text-muted-foreground">Total Courses</Label>
                    <p className="text-lg font-medium">{instructorData.stats.totalCourses}</p>
                </div>
                <div>
                    <Label className="text-muted-foreground">Average Rating</Label>
                    <p className="text-lg font-medium">{instructorData.stats.averageRating} ({instructorData.stats.totalReviews} reviews)</p>
                </div>
                <div>
                    <Label className="text-muted-foreground">Total Earnings</Label>
                    <p className="text-lg font-medium">${instructorData.stats.totalEarnings}</p>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
