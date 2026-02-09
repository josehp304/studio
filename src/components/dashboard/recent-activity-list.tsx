
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BookOpen, CheckCircle, Trophy } from "lucide-react";

interface ActivityItem {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface RecentActivityListProps {
  activities: ActivityItem[];
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "progress":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      case "completion":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "quiz":
      case "certificate":
        return <Trophy className="h-4 w-4 text-amber-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
              <div className="mt-1 bg-muted rounded-full p-2">
                {getIcon(activity.type)}
              </div>
              <div>
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
