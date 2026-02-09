
import { courses } from '@/lib/data';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Star, PlayCircle, BookOpen, Clock, Users, CheckCircle, Video, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return <div className="container mx-auto py-12">Course not found.</div>;
  }

  const totalReviews = course.reviewCount;
  const ratingDistribution = [
    { stars: 5, count: Math.floor(totalReviews * 0.7) },
    { stars: 4, count: Math.floor(totalReviews * 0.2) },
    { stars: 3, count: Math.floor(totalReviews * 0.05) },
    { stars: 2, count: Math.floor(totalReviews * 0.03) },
    { stars: 1, count: Math.floor(totalReviews * 0.02) },
  ];

  return (
    <div>
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Courses</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{course.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-6">
            <Badge>{course.category}</Badge>
            <h1 className="text-4xl font-bold text-primary font-headline mt-2">{course.title}</h1>
            <div className="flex items-center gap-6 mt-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} data-ai-hint="instructor avatar"/>
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>By {course.instructor.name}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold text-base">{course.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground ml-1">({course.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Users className="w-5 h-5" />
                    <span>{course.studentCount} Students</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-12 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-bold font-headline text-primary">Course Description</h3>
                    <p className="text-muted-foreground">
                      This course provides a comprehensive overview of UI/UX design, covering fundamental principles, industry-standard tools, and practical techniques. You'll learn to create intuitive and visually appealing digital experiences, from initial research and wireframing to prototyping and user testing. By the end of this course, you'll have a strong portfolio and the skills to kickstart a career in UI/UX design.
                    </p>
                     <p className="text-muted-foreground">
                      We'll explore user psychology, information architecture, and interaction design to build user-centered products. Through hands-on projects, you'll master tools like Figma and Adobe XD, and understand how to collaborate effectively in a design team.
                    </p>
                    <h3 className="text-xl font-bold font-headline text-primary">What you'll learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Understand the principles of UI/UX design.", "Create wireframes and prototypes.", "Conduct user research and testing.", "Master design tools like Figma and Sketch.", "Build a strong design portfolio.", "Learn to work in a design team."].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="curriculum" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                     <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold font-headline text-primary">Course Curriculum</h3>
                      <span className="text-sm text-muted-foreground">{course.lessons} lessons, {course.duration}</span>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {course.curriculum.map((section, i) => (
                         <AccordionItem value={`item-${i}`} key={i}>
                           <AccordionTrigger className="font-semibold text-base">{section.section}</AccordionTrigger>
                           <AccordionContent>
                             <ul className="space-y-3 mt-2">
                              {section.lessons.map((lesson, j) => (
                                <li key={j} className="flex justify-between items-center p-2 rounded-md hover:bg-primary/5">
                                  <div className="flex items-center gap-3">
                                    <Video className="w-5 h-5 text-primary" />
                                    <span>{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    {lesson.isPreview && <Badge variant="outline" className="text-accent border-accent">Preview</Badge>}
                                    <span>{lesson.duration}</span>
                                  </div>
                                </li>
                              ))}
                             </ul>
                           </AccordionContent>
                         </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="instructor" className="mt-6">
                <Card>
                  <CardContent className="p-6 space-y-6">
                     <div className="flex items-center gap-6">
                         <Avatar className="h-24 w-24">
                            <AvatarImage src={course.instructor.avatarUrl} alt={course.instructor.name} data-ai-hint="instructor avatar"/>
                            <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-2xl font-bold font-headline text-primary">{course.instructor.name}</h3>
                            <p className="text-muted-foreground">Lead Instructor</p>
                             <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="font-bold">4.8</span>
                                    <span className="text-sm text-muted-foreground ml-1">Instructor Rating</span>
                                </div>
                            </div>
                        </div>
                     </div>
                     <p className="text-muted-foreground">
                        {course.instructor.name} is a seasoned designer with over 10 years of experience in the tech industry. She has worked with startups and Fortune 500 companies to create delightful user experiences. She is passionate about teaching and mentoring the next generation of designers.
                     </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                     <h3 className="text-xl font-bold font-headline text-primary mb-6">Student Reviews</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="flex flex-col items-center justify-center bg-primary/5 p-6 rounded-lg">
                            <span className="text-5xl font-bold text-primary">{course.rating.toFixed(1)}</span>
                            <div className="flex items-center text-amber-500 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-6 h-6 ${i < Math.round(course.rating) ? 'fill-current' : ''}`} />
                                ))}
                            </div>
                            <p className="text-muted-foreground mt-2">({totalReviews} Reviews)</p>
                        </div>
                        <div className="col-span-2 space-y-2">
                           {ratingDistribution.map(item => (
                            <div key={item.stars} className="flex items-center gap-4">
                                <span className="w-12 text-sm text-muted-foreground">{item.stars} star</span>
                                <Progress value={(item.count / totalReviews) * 100} className="w-full h-2" />
                                <span className="w-16 text-sm font-semibold">{(item.count / totalReviews * 100).toFixed(0)}%</span>
                            </div>
                           ))}
                        </div>
                     </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
                <CardContent className="p-0">
                   <div className="relative">
                        <Image src={course.imageUrl} alt={course.title} width={600} height={400} className="w-full h-auto rounded-t-lg" data-ai-hint="course thumbnail"/>
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-t-lg">
                            <PlayCircle className="w-20 h-20 text-white/80 hover:text-white transition-colors cursor-pointer"/>
                        </div>
                   </div>
                   <div className="p-6 space-y-4">
                        <p className="text-3xl font-bold text-primary">${course.price}</p>
                        <Button size="lg" className="w-full font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">Add to Cart</Button>
                        <Button size="lg" variant="outline" className="w-full font-bold text-primary border-primary hover:bg-primary/5 hover:text-primary">Buy Now</Button>
                        <Button asChild size="lg" variant="secondary" className="w-full font-bold text-secondary-foreground mt-2">
                            <Link href={`/courses/${course.id}/watch`}>Watch Now (For Testing)</Link>
                        </Button>
                   </div>
                   <div className="p-6 border-t space-y-3">
                        <h4 className="font-semibold font-headline">This course includes:</h4>
                        <ul className="space-y-2 text-muted-foreground text-sm">
                           <li className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-primary"/>{course.lessons} lessons</li>
                           <li className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary"/>{course.duration}</li>
                           <li className="flex items-center gap-3"><Download className="w-5 h-5 text-primary"/>Downloadable resources</li>
                           <li className="flex items-center gap-3"><FileText className="w-5 h-5 text-primary"/>Certificate of completion</li>
                        </ul>
                   </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
