
import { courses } from '@/lib/data';
import { ChevronLeft, PlayCircle, CheckCircle, FileText, Download, ThumbsUp, Video } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function WatchCoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return <div className="container mx-auto py-12">Course not found.</div>;
  }

  const currentLesson = course.curriculum[0].lessons[0];
  const completedLessons = 12;
  const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0);
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      <aside className="w-[380px] border-r bg-card flex flex-col shrink-0">
        <div className="p-6 border-b">
          <Button asChild variant="ghost" className="mb-4 -ml-4 text-primary hover:text-primary">
            <Link href={`/courses/${course.id}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Link>
          </Button>
          <h2 className="text-lg font-bold font-headline mb-2 text-primary">{course.title}</h2>
          <Progress value={progressPercentage} className="w-full h-2 mb-2" />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</p>
            <p className="text-xs text-muted-foreground">Last activity on April 20, 2025</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <Accordion type="multiple" defaultValue={[`item-0`]} className="w-full">
            {course.curriculum.map((section, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="font-semibold text-base hover:no-underline px-4 py-3 rounded-md hover:bg-primary/5">
                  <div className="text-left">
                    <p className="text-sm font-semibold">{section.section}</p>
                    <p className="text-xs font-normal text-muted-foreground mt-1">Section {i+1}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul className="space-y-1 my-2">
                    {section.lessons.map((lesson, j) => {
                      const isCurrent = lesson.title === currentLesson.title && section.section === course.curriculum[0].section;
                      return (
                        <li key={j} className="px-2">
                          <Link href="#" className={`flex items-start gap-3 p-3 rounded-md text-sm transition-colors ${isCurrent ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'}`}>
                            {isCurrent ? <PlayCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" /> : <Video className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                            <span className="flex-grow">{lesson.title}</span>
                            <span className="text-xs">{lesson.duration}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b bg-card">
           <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Course Watch</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex gap-2">
                <Button variant="outline">Previous Lesson</Button>
                <Button className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">Next Lesson</Button>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
            <div className="aspect-video bg-black rounded-lg mb-6 relative group">
                <Image src="https://picsum.photos/seed/1/1280/720" fill objectFit="cover" alt="Course video thumbnail" className="rounded-lg" data-ai-hint="course video whiteboard"/>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
                    <PlayCircle className="w-24 h-24 text-white/70 group-hover:text-white transition-colors cursor-pointer" />
                </div>
            </div>
            
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
              </TabsList>

              <TabsContent value="description">
                <h1 className="text-3xl font-bold font-headline mb-2 text-primary">{currentLesson.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm"><ThumbsUp className="mr-2 h-4 w-4" /> Like (1,234)</Button>
                  <Badge variant="secondary">Difficulty: Beginner</Badge>
                </div>
                <div className="space-y-4 text-muted-foreground">
                    <p>
                        Welcome to the first lesson! Here we will introduce the core concepts of the course and set you up for success. This lesson covers the fundamental building blocks and provides an overview of what you will learn throughout this section.
                    </p>
                    <p>
                        Make sure to follow along with the provided examples and complete the short quiz at the end to test your understanding. Let's get started!
                    </p>
                </div>
              </TabsContent>

              <TabsContent value="resources">
                 <h2 className="text-xl font-semibold mb-4">Downloadable Resources</h2>
                 <div className="border rounded-lg">
                    <ul className="divide-y">
                        <li className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-primary"/>
                                <span className="font-medium">Lesson 1 Slides.pdf</span>
                            </div>
                            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download</Button>
                        </li>
                        <li className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-primary"/>
                                <span className="font-medium">Project Files.zip</span>
                            </div>
                            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/> Download</Button>
                        </li>
                    </ul>
                 </div>
              </TabsContent>

               <TabsContent value="qa">
                 <h2 className="text-xl font-semibold mb-4">Questions & Answers</h2>
                 <p className="text-muted-foreground">No questions yet. Be the first to ask!</p>
              </TabsContent>
            </Tabs>
        </main>
      </div>
    </div>
  );
}
