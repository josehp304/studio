import { CourseCardGrid } from "@/components/course-card-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { courses, featuredInstructors } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, Briefcase, Camera, Code, Megaphone, Palette, Search, Star, Users, Video, BarChart2, ListChecks, BadgeDollarSign, PlaySquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstructorCard } from "@/components/instructor-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const categories = [
  { name: 'Design', icon: Palette, courseCount: 28, href: '/courses' },
  { name: 'Development', icon: Code, courseCount: 42, href: '/courses' },
  { name: 'IT & Software', icon: Briefcase, courseCount: 35, href: '/courses' },
  { name: 'Business', icon: BarChart2, courseCount: 19, href: '/courses' },
  { name: 'Marketing', icon: Megaphone, courseCount: 25, href: '/courses' },
  { name: 'Photography', icon: Camera, courseCount: 12, href: '/courses' },
];

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export default function Home() {
  const featuredCourses = courses.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">
              The Best Way to <br/> Learn Your Favorite Course
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from over 200,000 online video courses with new additions published every month.
            </p>
            <div className="relative max-w-lg mx-auto lg:mx-0">
               <Input
                placeholder="Search for anything..."
                className="h-14 text-base pl-14 rounded-full shadow-lg"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
              <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281] rounded-full">
                Search
              </Button>
            </div>
          </div>
          <div className="relative h-64 lg:h-full min-h-[250px]">
             <Image
              src={getImage('hero-background')}
              alt="E-learning student"
              fill
              className="object-contain"
              data-ai-hint="e-learning student"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="flex items-center justify-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                          <Video className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-primary">200,000+ Online Courses</h3>
                          <p className="text-muted-foreground">Explore a wide range of skills.</p>
                      </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                       <div className="bg-primary/10 p-3 rounded-full">
                          <Users className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-primary">Expert Instruction</h3>
                          <p className="text-muted-foreground">Find the right instructor for you.</p>
                      </div>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                       <div className="bg-primary/10 p-3 rounded-full">
                          <Star className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                          <h3 className="text-lg font-bold text-primary">Lifetime Access</h3>
                          <p className="text-muted-foreground">Learn on your schedule.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Featured Courses</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Explore our most popular courses for professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCardGrid key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="font-bold text-primary border-primary hover:bg-primary/5 hover:text-primary">
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Top Categories Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Top Categories</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Discover your perfect program in our courses.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <div className="group bg-card p-6 rounded-lg shadow-card text-center transition-transform duration-300 hover:-translate-y-2">
                  <div className="inline-block bg-primary/10 p-4 rounded-full mb-4 group-hover:bg-accent transition-colors">
                    <category.icon className="h-8 w-8 text-primary group-hover:text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-primary group-hover:text-accent">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.courseCount} Courses</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">How It Works</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Start your learning journey in just a few simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <ListChecks className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">1. Browse Courses</h3>
              <p className="text-muted-foreground">
                Explore a wide variety of courses and find the one that's right for you. Use our search and filters to narrow down your options.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <BadgeDollarSign className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">2. Purchase & Enroll</h3>
              <p className="text-muted-foreground">
                Once you've found your course, simply purchase it to get lifetime access. Enrollment is quick and easy.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 p-6 rounded-full mb-4">
                <PlaySquare className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">3. Start Learning</h3>
              <p className="text-muted-foreground">
                Begin your learning adventure immediately. Watch lessons, complete assignments, and interact with instructors at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto">
              <div className="text-center mb-12">
                  <p className="font-semibold text-accent mb-2">Featured Instructors</p>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Top Class & Professional Instructors</h2>
                  <p className="text-lg text-primary-foreground/80 mt-2">
                      Empowering Change: Stories from Those Who Took the Leap
                  </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredInstructors.map((instructor) => (
                      <InstructorCard key={instructor.id} instructor={instructor} />
                  ))}
              </div>
          </div>
      </section>

      {/* Become an Instructor Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="relative rounded-lg overflow-hidden p-12 bg-primary text-primary-foreground">
             <div className="absolute inset-0">
                <Image
                  src={getImage('become-instructor-banner')}
                  alt="Become an Instructor"
                  fill
                  className="object-cover opacity-20"
                  data-ai-hint="instructor teaching"
                />
             </div>
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">Become an Instructor</h2>
                  <p className="text-lg text-primary-foreground/80">
                    Instructors from around the world teach millions of students on our platform. We provide the tools and skills to teach what you love.
                  </p>
                  <Button asChild size="lg" className="font-bold text-primary bg-white hover:bg-gray-100">
                    <Link href="/instructor">Start Teaching Today</Link>
                  </Button>
                </div>
                 <div className="hidden md:block">
                     {/* Can add an image or graphic here */}
                 </div>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Have questions? We've got answers.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-primary">Are the courses self-paced?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, absolutely! All of our courses are designed to be self-paced. You can learn on your own schedule, from anywhere in the world. Once you enroll, you have lifetime access to the course materials.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-primary">What if I'm not happy with a course?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer a 30-day money-back guarantee on all of our courses. If you're not satisfied for any reason, just contact our support team within 30 days of purchase for a full refund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-primary">Do I get a certificate upon completion?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Upon successful completion of any paid course, you will receive a verifiable certificate that you can share on your LinkedIn profile, resume, or with your employer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-primary">Can I access courses on my mobile device?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our platform is fully responsive, which means you can access your courses and learn on any device - desktop, tablet, or smartphone.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
