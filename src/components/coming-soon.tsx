
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
                <Hammer className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground mt-4">We are working hard to bring you this feature.</p>
        </CardContent>
      </Card>
    </div>
  );
}
