
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Facebook, Twitter, Linkedin, Instagram, Github } from "lucide-react";

export function SocialProfilesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Profiles</CardTitle>
        <CardDescription>
          Add your social media links to your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
            <div className="flex items-center gap-4">
                <Twitter className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                    <Label htmlFor="twitter" className="sr-only">Twitter</Label>
                    <Input id="twitter" placeholder="Twitter URL" defaultValue="https://twitter.com/johndoe" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Facebook className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                    <Label htmlFor="facebook" className="sr-only">Facebook</Label>
                    <Input id="facebook" placeholder="Facebook URL" />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Linkedin className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                    <Label htmlFor="linkedin" className="sr-only">LinkedIn</Label>
                    <Input id="linkedin" placeholder="LinkedIn URL" defaultValue="https://linkedin.com/in/johndoe" />
                </div>
            </div>
             <div className="flex items-center gap-4">
                <Instagram className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                    <Label htmlFor="instagram" className="sr-only">Instagram</Label>
                    <Input id="instagram" placeholder="Instagram URL" />
                </div>
            </div>
             <div className="flex items-center gap-4">
                <Github className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                    <Label htmlFor="github" className="sr-only">GitHub</Label>
                    <Input id="github" placeholder="GitHub URL" defaultValue="https://github.com/johndoe" />
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save Profiles</Button>
      </CardFooter>
    </Card>
  );
}
