'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, PlayCircle, CheckCircle, FileText, Download, ThumbsUp, Video, Menu } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Course } from '@/lib/data'; // We can use the UI type
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface LessonPlayerProps {
    course: Course;
    progress: {
        completedCount: number;
        totalCount: number;
        progressMap: Record<string, boolean>;
    };
    userId: string;
}

export function LessonPlayer({ course, progress, userId }: LessonPlayerProps) {
    // Flatten lessons to easy navigation
    // Including moduleId in the flat map to easy access
    const allLessons = course.curriculum.flatMap(section =>
        section.lessons.map(lesson => ({ ...lesson, sectionName: section.section, moduleId: section.id }))
    );

    // State for current lesson (default to first)
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const currentLesson = allLessons[currentLessonIndex];

    // Check if current lesson is completed
    const [completedMap, setCompletedMap] = useState(progress.progressMap);
    const [completedCount, setCompletedCount] = useState(progress.completedCount);

    // Calculate progress
    const progressPercentage = (completedCount / Math.max(progress.totalCount, 1)) * 100;

    const router = useRouter();

    const handleLessonSelect = (index: number) => {
        setCurrentLessonIndex(index);
    };

    const handleToggleComplete = async (checked: boolean) => {
        // Optimistic update
        const lessonId = (currentLesson as any).id;
        const moduleId = (currentLesson as any).moduleId;

        if (!lessonId || !moduleId) {
            toast.error("Lesson or Module ID missing");
            return;
        }

        const wasCompleted = completedMap[lessonId];
        const isCompleted = checked;

        setCompletedMap(prev => ({ ...prev, [lessonId]: isCompleted }));
        setCompletedCount(prev => isCompleted ? prev + 1 : prev - 1);

        try {
            // Now using proper moduleId
            const response = await fetch(`/api/courses/${course.id}/modules/${moduleId}/lessons/${lessonId}/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isCompleted })
            });

            if (!response.ok) {
                throw new Error("Failed to update");
            }
            router.refresh();

        } catch (error) {
            // Revert
            setCompletedMap(prev => ({ ...prev, [lessonId]: wasCompleted }));
            setCompletedCount(prev => wasCompleted ? prev : prev + 1); // revert
            toast.error("Failed to update progress");
        }
    };

    const handleNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
        }
    };

    if (!currentLesson) {
        return <div className="p-8">No lessons available in this course.</div>;
    }

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-[380px] border-r bg-card flex-col shrink-0">
                <SidebarContent
                    course={course}
                    progressPercentage={progressPercentage}
                    currentLessonIndex={currentLessonIndex}
                    completedMap={completedMap}
                    onSelectLesson={handleLessonSelect}
                    allLessons={allLessons}
                />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between p-4 border-b bg-card">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="lg:hidden">
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-[300px]">
                                <SidebarContent
                                    course={course}
                                    progressPercentage={progressPercentage}
                                    currentLessonIndex={currentLessonIndex}
                                    completedMap={completedMap}
                                    onSelectLesson={handleLessonSelect}
                                    allLessons={allLessons}
                                />
                            </SheetContent>
                        </Sheet>
                        <Breadcrumb className="hidden md:flex">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={`/courses/${course.id}`}>Back to Course</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{currentLesson.sectionName}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="text-sm font-bold md:hidden truncate max-w-[200px]">{course.title}</h1>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrev} disabled={currentLessonIndex === 0}>Previous</Button>
                        <Button
                            className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]"
                            onClick={handleNext}
                            disabled={currentLessonIndex === allLessons.length - 1}
                        >
                            Next Lesson
                        </Button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="aspect-video bg-black rounded-lg mb-6 relative group flex items-center justify-center overflow-hidden shadow-lg border border-border">
                            {currentLesson ? (
                                <video
                                    key={(currentLesson as any).id} // Force re-mount on lesson change to reset stream buffer
                                    src={`/api/stream/${(currentLesson as any).id}`}
                                    controls
                                    controlsList="nodownload"
                                    preload="metadata"
                                    className="w-full h-full object-contain bg-black"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <>
                                    <PlayCircle className="w-24 h-24 text-white/50" />
                                    <p className="absolute bottom-4 text-white/70">No video selected</p>
                                </>
                            )}
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold font-headline text-primary">{currentLesson.title}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground hidden md:inline">{!!completedMap[(currentLesson as any).id] ? 'Completed' : 'Mark as completed'}</span>
                                <Checkbox
                                    id="complete"
                                    checked={!!completedMap[(currentLesson as any).id]}
                                    onCheckedChange={handleToggleComplete}
                                />
                            </div>
                        </div>

                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="resources">Resources</TabsTrigger>
                                <TabsTrigger value="qa">Q&A</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="text-muted-foreground space-y-4">
                                <p>Lesson description would go here. We currently don't separate lesson description in the UI model, but it's in the DB.</p>
                            </TabsContent>
                            <TabsContent value="resources">
                                <div className="p-4 border rounded-md text-center text-muted-foreground">
                                    No resources available for this lesson.
                                </div>
                            </TabsContent>
                            <TabsContent value="qa">
                                <div className="p-4 border rounded-md text-center text-muted-foreground">
                                    Q&A feature coming soon.
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>
    );
}

function SidebarContent({ course, progressPercentage, currentLessonIndex, completedMap, onSelectLesson, allLessons }: any) {
    return (
        <>
            <div className="p-6 border-b">
                <Link href={`/courses/${course.id}`} className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-4 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Course Details
                </Link>
                <h2 className="text-lg font-bold font-headline mb-2 text-primary line-clamp-2">{course.title}</h2>
                <Progress value={progressPercentage} className="w-full h-2 mb-2" />
                <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</p>
                </div>
            </div>
            <ScrollArea className="flex-1">
                <Accordion type="multiple" defaultValue={course.curriculum.map((_: any, i: number) => `item-${i}`)} className="w-full">
                    {course.curriculum.map((section: any, i: number) => (
                        <AccordionItem value={`item-${i}`} key={i}>
                            <AccordionTrigger className="font-semibold text-base hover:no-underline px-4 py-3 bg-muted/30">
                                <div className="text-left">
                                    <p className="text-sm font-semibold">{section.section}</p>
                                    <p className="text-xs font-normal text-muted-foreground mt-1">
                                        {section.lessons.length} Lessons
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0">
                                <ul className="space-y-0.5">
                                    {section.lessons.map((lesson: any, j: number) => {
                                        // Find index in flat list
                                        const globalIndex = allLessons.findIndex((l: any) => l.title === lesson.title && l.sectionName === section.section);
                                        const isCurrent = globalIndex === currentLessonIndex;
                                        const isCompleted = !!completedMap[lesson.id];

                                        return (
                                            <li key={j}>
                                                <button
                                                    onClick={() => onSelectLesson(globalIndex)}
                                                    className={cn(
                                                        "flex items-start gap-3 p-3 w-full text-left transition-colors border-l-2",
                                                        isCurrent
                                                            ? "bg-primary/10 border-primary text-primary"
                                                            : "border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                                    )}
                                                >
                                                    {isCompleted
                                                        ? <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                                                        : (isCurrent ? <PlayCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <Video className="w-4 h-4 mt-0.5 flex-shrink-0" />)
                                                    }
                                                    <div className="flex-grow">
                                                        <p className={cn("text-sm font-medium", isCurrent && "font-bold")}>{lesson.title}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{lesson.duration}</p>
                                                    </div>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </ScrollArea>
        </>
    );
}
