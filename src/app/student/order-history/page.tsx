
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { studentData } from "@/lib/dummy-data";

export default function OrderHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground">View your past purchases and invoices.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentData.orderHistory.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                      <div className="flex flex-col">
                          {order.items.map((item: string, i: number) => (
                              <span key={i} className="text-sm">{item}</span>
                          ))}
                      </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
