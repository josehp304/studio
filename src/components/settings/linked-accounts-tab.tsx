
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";

export function LinkedAccountsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Linked Accounts</CardTitle>
        <CardDescription>
          Connect your accounts to log in faster.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
                <div className="bg-muted p-2 rounded-full">
                    <Mail className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium leading-none">Google</p>
                    <p className="text-sm text-muted-foreground">Connected as john.doe@gmail.com</p>
                </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
        </div>
        <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
            <div className="flex items-center space-x-4">
                <div className="bg-muted p-2 rounded-full">
                    <Github className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-medium leading-none">GitHub</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
            </div>
            <Button size="sm">Connect</Button>
        </div>
      </CardContent>
    </Card>
  );
}
