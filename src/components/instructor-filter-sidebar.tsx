
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function InstructorFilterSidebar() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="link" className="text-red-500 h-auto p-0">
          Clear
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "instructors", "price"]} className="w-full">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="text-base font-semibold hover:no-underline py-2">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="backend" />
                <Label htmlFor="backend" className="text-sm font-normal text-muted-foreground">Backend (3)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="css" />
                <Label htmlFor="css" className="text-sm font-normal text-muted-foreground">CSS (2)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="frontend" />
                <Label htmlFor="frontend" className="text-sm font-normal text-muted-foreground">Frontend (2)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="general" />
                <Label htmlFor="general" className="text-sm font-normal text-muted-foreground">General (2)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="it" className="data-[state=checked]:bg-primary" defaultChecked />
                <Label htmlFor="it" className="text-sm font-normal text-muted-foreground">IT & Software (2)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="photography" />
                <Label htmlFor="photography" className="text-sm font-normal text-muted-foreground">Photography (2)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="programming" />
                <Label htmlFor="programming" className="text-sm font-normal text-muted-foreground">Programming Language (3)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="technology" />
                <Label htmlFor="technology" className="text-sm font-normal text-muted-foreground">Technology (2)</Label>
              </div>
               <Button variant="link" className="text-red-500 h-auto p-0 text-sm mt-2">
                  See More
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="instructors" className="border-none">
          <AccordionTrigger className="text-base font-semibold hover:no-underline py-2">
            Instructors
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="keny" />
                <Label htmlFor="keny" className="text-sm font-normal text-muted-foreground">Keny White (10)</Label>
              </div>
              <div className="flex items-center space-x-2">
                 <Checkbox id="hinata" />
                 <Label htmlFor="hinata" className="text-sm font-normal text-muted-foreground">Hinata Hyuga (5)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="john" />
                <Label htmlFor="john" className="text-sm font-normal text-muted-foreground">John Doe (3)</Label>
              </div>
               <div className="flex items-center space-x-2">
                <Checkbox id="nicole" />
                <Label htmlFor="nicole" className="text-sm font-normal text-muted-foreground">Nicole Brown (2)</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="text-base font-semibold hover:no-underline py-2">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="all" />
                <Label htmlFor="all" className="text-sm font-normal text-muted-foreground">All (2,568)</Label>
              </div>
               <div className="flex items-center space-x-2">
                <Checkbox id="free" />
                <Label htmlFor="free" className="text-sm font-normal text-muted-foreground">Free (154)</Label>
              </div>
               <div className="flex items-center space-x-2">
                <Checkbox id="paid" />
                <Label htmlFor="paid" className="text-sm font-normal text-muted-foreground">Paid (2,414)</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
