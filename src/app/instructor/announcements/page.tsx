
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { instructorData } from "@/lib/dummy-data";
import { Plus, Bell } from "lucide-react";

export default function InstructorAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Notify your students about updates and news.</p>
        </div>
        <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Announcement
        </Button>
      </div>

      <div className="grid gap-6">
        {instructorData.announcements.map((announcement: any) => (
          <Card key={announcement.id}>
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                    <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{announcement.date} • {announcement.course}</p>
                </div>
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
