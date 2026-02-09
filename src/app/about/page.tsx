
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, BookOpen, Award, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
             <span className="text-primary font-semibold tracking-wide uppercase text-sm">About Our University</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">About Dreams LMS</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We share knowledge with the world. We assist you in exploring and learning about the world's best courses.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://picsum.photos/seed/about-hero/800/600"
                alt="Students learning"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Empowering Learners Globally</h2>
              <p className="text-muted-foreground text-lg">
                Dreams LMS is on a mission to democratize education. We believe that everyone should have the opportunity to learn from the best, regardless of their location or background.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Quality Education</h3>
                    <p className="text-muted-foreground">Access to top-tier courses from industry experts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-3 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Community Driven</h3>
                    <p className="text-muted-foreground">Join a vibrant community of learners and instructors.</p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-4">Read More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="h-10 w-10 opacity-80" />
              </div>
              <h3 className="text-4xl font-bold">45K+</h3>
              <p className="text-primary-foreground/80">Active Students</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <BookOpen className="h-10 w-10 opacity-80" />
              </div>
              <h3 className="text-4xl font-bold">120+</h3>
              <p className="text-primary-foreground/80">Courses</p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-center">
                    <GraduationCap className="h-10 w-10 opacity-80" />
                </div>
              <h3 className="text-4xl font-bold">180+</h3>
              <p className="text-primary-foreground/80">Instructors</p>
            </div>
            <div className="space-y-2">
                <div className="flex justify-center">
                    <Award className="h-10 w-10 opacity-80" />
                </div>
              <h3 className="text-4xl font-bold">100%</h3>
              <p className="text-primary-foreground/80">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              The passionate individuals behind Dreams LMS dedicated to your success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-none shadow-none hover:shadow-lg transition-shadow">
                <div className="relative h-80 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/team${i}/400/500`}
                    alt={`Team Member ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="text-center p-4">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-primary font-medium mb-2">Founder & CEO</p>
                  <p className="text-sm text-muted-foreground">
                    Visionary leader with a passion for education technology.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        
      {/* Join CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
             <h2 className="text-3xl font-bold mb-6">Become an Instructor</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of instructors and earn money teaching people around the world.
             </p>
             <div className="flex justify-center gap-4">
                 <Button size="lg">Start Teaching</Button>
                 <Button size="lg" variant="outline">Learn More</Button>
             </div>
        </div>
      </section>
    </div>
  );
}
