
'use client';
import React, { useState } from 'react';
import { courses } from '@/lib/data';
import { CourseCardGrid } from './course-card-grid';
import { CourseCardList } from './course-card-list';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationFirst, PaginationLast, PaginationEllipsis } from './ui/pagination';
import { List, Grid, Search } from 'lucide-react';

export function CourseListing() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <section className="py-12">
      <div className="container mx-auto">
        {/* Search Bar */}
        <div className="mb-8 p-6 bg-card rounded-lg shadow-card">
          <div className="relative">
            <Input
              placeholder="Search Courses, Instructors, etc."
              className="h-12 text-base pl-12"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Button className="absolute right-2 top-1/2 -translate-y-1/2 font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                Search
              </Button>
          </div>
        </div>

        {/* Filter and View Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <p className="text-muted-foreground">Showing 1-9 of {courses.length} results</p>
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="it-software">IT & Software</SelectItem>
                <SelectItem value="art-design">Art & Design</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center rounded-md bg-card p-1 border">
              <Button
                variant={view === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setView('grid')}
                className={view === 'grid' ? 'bg-primary/10 text-primary' : ''}
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={view === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setView('list')}
                className={view === 'list' ? 'bg-primary/10 text-primary' : ''}
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Course Items */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCardGrid key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {courses.map((course) => (
              <CourseCardList key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-12">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationFirst href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                        2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLast href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </div>
    </section>
  );
}
