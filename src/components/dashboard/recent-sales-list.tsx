
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SaleItem {
  id: number;
  student: string;
  course: string;
  amount: number;
  date: string;
}

interface RecentSalesListProps {
  sales: SaleItem[];
}

export function RecentSalesList({ sales }: RecentSalesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sales.map((sale) => (
            <div key={sale.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://picsum.photos/seed/${sale.student}/200/200`} alt={sale.student} />
                <AvatarFallback>{sale.student.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{sale.student}</p>
                <p className="text-sm text-muted-foreground">
                  Purchased {sale.course}
                </p>
              </div>
              <div className="ml-auto font-medium">+${sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
