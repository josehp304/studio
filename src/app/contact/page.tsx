
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
       {/* Header Section */}
      <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <span className="text-primary font-medium">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-sm border space-y-6">
              <h3 className="text-xl font-bold border-b pb-4">Contact Details</h3>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    3556 Beech Street, San Francisco,<br />
                    California, CA 94108
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone Number</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    +19 123-456-7890<br />
                    +19 987-654-3210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email Address</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    info@dreamslms.com<br />
                    support@dreamslms.com
                  </p>
                </div>
              </div>
                
               <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Working Hours</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat - Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                        id="message" 
                        placeholder="Write your message here..." 
                        className="min-h-[150px]"
                    />
                  </div>

                  <Button size="lg" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Google Maps Placeholder
            </p>
        </div>
      </div>
    </div>
  );
}
