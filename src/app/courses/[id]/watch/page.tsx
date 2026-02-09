
import { courses } from '@/lib/data';
import { ChevronLeft, PlayCircle, Video, FileText } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export default function WatchCoursePage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return <div className="container mx-auto py-12">Course not found.</div>;
  }

  const currentLesson = course.curriculum[0].lessons[0];

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
                <Link href={`/courses/${course.id}`}>
                    <ChevronLeft className="h-5 w-5" />
                </Link>
            </Button>
            <div>
                <p className="text-sm text-muted-foreground">Back to Course</p>
                <h1 className="text-lg font-semibold text-primary">{course.title}</h1>
            </div>
          </div>
           <div className="flex gap-2">
                <Button variant="outline">Previous</Button>
                <Button className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">Next Lesson</Button>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
            <div className="aspect-video bg-black rounded-lg mb-6 flex items-center justify-center">
                <PlayCircle className="w-24 h-24 text-white/50" />
            </div>
            <h2 className="text-2xl font-bold font-headline mb-2">{currentLesson.title}</h2>
            <p className="text-muted-foreground">
                Welcome to the first lesson! Here we will introduce the core concepts of the course and set you up for success.
            </p>
        </main>
      </div>
      <aside className="w-80 border-l bg-card flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold font-headline">Course Content</h3>
        </div>
        <div className="overflow-y-auto flex-1">
          <Accordion type="multiple" defaultValue={[`item-0`]} className="w-full">
            {course.curriculum.map((section, i) => (
              <AccordionItem value={`item-${i}`} key={i}>
                <AccordionTrigger className="font-semibold text-sm px-4 py-3 hover:bg-primary/5">
                  <div className="text-left">
                    <p>{section.section}</p>
                    <p className="text-xs font-normal text-muted-foreground mt-1">{i+1} / {course.curriculum.length} | {section.lessons.length} lessons</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ul className="space-y-1 mt-1">
                    {section.lessons.map((lesson, j) => (
                      <li key={j} className={`px-4 py-3 border-l-4 ${j === 0 && i === 0 ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-primary/5'}`}>
                        <Link href="#" className="flex items-start gap-3">
                          <Video className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-grow">
                            <p className={`text-sm ${j === 0 && i === 0 ? 'font-semibold text-primary' : ''}`}>{lesson.title}</p>
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </aside>
    </div>
  );
}
