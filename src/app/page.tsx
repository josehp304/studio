
import { CourseCardGrid } from "@/components/course-card-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { featuredInstructors } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Briefcase, Camera, Code, Megaphone, Palette, Search, Star, Users, Video, BarChart2, ListChecks, BadgeDollarSign, PlaySquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstructorCard } from "@/components/instructor-card";
import { getPublishedCourses } from "@/db/queries/courses";
import { mapDbCourseToUiCourse } from "@/lib/mappers";
import { FetchErrorToast } from "@/components/fetch-error-toast";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dbCourses: any[] = [];
  let fetchError: string | null = null;

  try {
    dbCourses = await getPublishedCourses();
  } catch (error) {
    console.error("Failed to load published courses on Home:", error);
    fetchError = "Unable to load courses. Please check your connection.";
  }

  const courses = dbCourses.map(mapDbCourseToUiCourse).slice(0, 4); // Show top 4

  return (
    <div className="flex flex-col min-h-screen">
      {fetchError && <FetchErrorToast message={fetchError} />}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                New Term Starts Soon
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl font-headline text-primary">
                Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF725E] to-[#F54B8D]">Expert-Led</span> Online Courses
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover a world of knowledge with our comprehensive learning platform. From coding to design, business to photography, we have courses for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Input placeholder="Search for courses..." className="pl-10 h-12" />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                </div>
                <Button size="lg" className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281] h-12">Search</Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden relative">
                      <Image src={PlaceHolderImages.find(img => img.id === `instructor-${i}`)?.imageUrl || ''} fill alt="User" objectFit="cover" />
                    </div>
                  ))}
                </div>
                <p>Trusted by over 10,000+ students worldwide</p>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF725E]/20 to-[#F54B8D]/20 rounded-full blur-3xl opacity-50 animate-pulse" />
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Students learning"
                  fill
                  className="object-cover rounded-2xl shadow-2xl relative z-10"
                  priority
                />
                <div className="absolute -bottom-6 -left-6 z-20 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">10k+</p>
                      <p className="text-xs text-muted-foreground">Active Students</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 z-20 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      <Star className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">4.8/5</p>
                      <p className="text-xs text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-headline text-primary">250+</h3>
              <p className="text-muted-foreground">Online Courses</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-headline text-primary">100+</h3>
              <p className="text-muted-foreground">Expert Instructors</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-headline text-primary">15k+</h3>
              <p className="text-muted-foreground">Students Enrolled</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold font-headline text-primary">50+</h3>
              <p className="text-muted-foreground">Certified Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">Explore Categories</h2>
              <p className="text-muted-foreground max-w-[600px]">Browse our wide range of course categories to find the perfect fit for your learning goals.</p>
            </div>
            <Button variant="outline" className="hidden md:flex">View ALl Categories <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Development", icon: Code, count: "120+ Courses", color: "text-blue-500", bg: "bg-blue-500/10" },
              { name: "Design", icon: Palette, count: "80+ Courses", color: "text-purple-500", bg: "bg-purple-500/10" },
              { name: "Business", icon: Briefcase, count: "50+ Courses", color: "text-green-500", bg: "bg-green-500/10" },
              { name: "Marketing", icon: Megaphone, count: "40+ Courses", color: "text-orange-500", bg: "bg-orange-500/10" },
              { name: "Photography", icon: Camera, count: "30+ Courses", color: "text-pink-500", bg: "bg-pink-500/10" },
              { name: "Videography", icon: Video, count: "25+ Courses", color: "text-red-500", bg: "bg-red-500/10" },
              { name: "Finance", icon: BadgeDollarSign, count: "20+ Courses", color: "text-teal-500", bg: "bg-teal-500/10" },
              { name: "Productivity", icon: ListChecks, count: "15+ Courses", color: "text-indigo-500", bg: "bg-indigo-500/10" },
            ].map((cat, i) => (
              <Link href="#" key={i} className="group p-6 bg-card rounded-xl border hover:shadow-lg transition-all hover:-translate-y-1 block">
                <div className={`h-12 w-12 rounded-lg ${cat.bg} flex items-center justify-center mb-4 ${cat.color}`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                <p className="text-sm text-muted-foreground">{cat.count}</p>
              </Link>
            ))}
          </div>
          <Button variant="outline" className="mt-8 w-full md:hidden">View ALl Categories <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit">
                Top Picks
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">Featured Courses</h2>
              <p className="text-muted-foreground max-w-[600px]">Hand-picked courses from our top instructors to get you started on your journey.</p>
            </div>
            <Button asChild>
              <Link href="/courses">View All Courses <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCardGrid key={course.id} course={course} />
            ))}
            {courses.length === 0 && (
              <div className="col-span-4 text-center py-12 text-muted-foreground">
                No courses available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Instructors */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">Meet Our Instructors</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">Learn from industry experts who are passionate about sharing their knowledge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInstructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="bg-gradient-to-r from-[#FF725E] to-[#F54B8D] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold font-headline">Ready to Start Learning?</h2>
              <p className="text-lg md:text-xl text-white/90">Join thousands of students and start your journey to success today. Determine your own pace and learn from the best.</p>
              <Button size="lg" variant="secondary" className="font-bold h-12 px-8 text-[#F54B8D]">Get Started Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
