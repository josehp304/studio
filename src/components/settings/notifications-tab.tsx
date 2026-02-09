
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function NotificationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure how you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
            <h4 className="text-sm font-medium">Email Notifications</h4>
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                    <span>Marketing emails</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive emails about new products, features, and more.</span>
                </Label>
                <Switch id="marketing-emails" defaultChecked />
            </div>
             <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="social-emails" className="flex flex-col space-y-1">
                    <span>Social emails</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive emails for friend requests, follows, and more.</span>
                </Label>
                <Switch id="social-emails" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                    <span>Security emails</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive emails about your account activity and security.</span>
                </Label>
                <Switch id="security-emails" disabled defaultChecked />
            </div>
        </div>
         <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium">Push Notifications</h4>
            <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="new-comments" className="flex flex-col space-y-1">
                    <span>New comments</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive push notifications when someone comments on your post.</span>
                </Label>
                <Switch id="new-comments" defaultChecked />
            </div>
             <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="new-mentions" className="flex flex-col space-y-1">
                    <span>New mentions</span>
                    <span className="font-normal text-xs text-muted-foreground">Receive push notifications when someone mentions you.</span>
                </Label>
                <Switch id="new-mentions" />
            </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  );
}
