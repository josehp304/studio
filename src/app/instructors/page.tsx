
import { InstructorFilterSidebar } from "@/components/instructor-filter-sidebar";
import { InstructorListItem } from "@/components/instructor-list-item";
import { instructorsList } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List, Search } from "lucide-react";
import Link from "next/link";

export default function InstructorsPage() {
  return (
    <div className="bg-background min-h-screen pb-10">
      {/* Header Section */}
      <div className="bg-primary/5 py-10 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-2">Instructor List</h1>
          <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>-</span>
            <span className="text-primary font-medium">Instructor List</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-card rounded-lg border p-6 sticky top-24">
               <InstructorFilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-transparent">
              <p className="text-sm text-muted-foreground font-medium">
                Showing {instructorsList.length} of {instructorsList.length} results
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-10 w-10">
                        <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="icon" className="h-10 w-10 bg-red-500 hover:bg-red-600 text-white">
                        <List className="h-4 w-4" />
                    </Button>
                </div>
                
                <Select defaultValue="newly-published">
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newly-published">Newly Published</SelectItem>
                    <SelectItem value="most-popular">Most Popular</SelectItem>
                    <SelectItem value="highest-rated">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative w-full sm:w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search" 
                    className="pl-9 bg-background"
                  />
                </div>
              </div>
            </div>

            {/* Instructor List */}
            <div className="space-y-4">
              {instructorsList.map((instructor) => (
                <InstructorListItem key={instructor.id} instructor={instructor} />
              ))}
            </div>
            
            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-8">
                <Button variant="outline" disabled className="mr-2">Previous</Button>
                <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
                <Button variant="ghost">2</Button>
                <Button variant="ghost">3</Button>
                <Button variant="outline" className="ml-2">Next</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
