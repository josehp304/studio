'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

function EditProfileTab() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0">
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-primary">Profile Photo</h3>
            <div className="flex items-center gap-6 mt-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://picsum.photos/seed/settings-avatar/200/200"
                  alt="User avatar"
                  data-ai-hint="user avatar"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">
                  PNG or JPG no bigger than 800px width and height
                </p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline">Upload</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-primary">Personal Details</h3>
              <p className="text-sm text-muted-foreground">
                Edit your personal information
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="Ronald" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="Richard" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">User Name</Label>
                <Input id="username" defaultValue="studentdemo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="90154-91036" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">DOB</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>dd/mm/yyyy</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us a little about yourself" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-8 justify-end gap-2 p-0">
        <Button variant="outline">Cancel</Button>
        <Button className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
          Update Profile
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SettingsForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="edit-profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="social-profiles">Social Profiles</TabsTrigger>
            <TabsTrigger value="linked-accounts">Linked Accounts</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing-address">Billing Address</TabsTrigger>
          </TabsList>
          <TabsContent value="edit-profile" className="mt-6">
            <EditProfileTab />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <p className="text-muted-foreground">Security settings will be here.</p>
          </TabsContent>
          <TabsContent value="social-profiles" className="mt-6">
            <p className="text-muted-foreground">Social profiles settings will be here.</p>
          </TabsContent>
          <TabsContent value="linked-accounts" className="mt-6">
            <p className="text-muted-foreground">Linked accounts settings will be here.</p>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <p className="text-muted-foreground">Notifications settings will be here.</p>
          </TabsContent>
          <TabsContent value="billing-address" className="mt-6">
            <p className="text-muted-foreground">Billing address settings will be here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
