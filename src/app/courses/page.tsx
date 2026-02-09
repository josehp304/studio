import { CourseListing } from "@/components/course-listing";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function CoursesPage() {
  return (
    <div>
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary font-headline mb-2">Course List</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Courses</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <CourseListing />
    </div>
  );
}
