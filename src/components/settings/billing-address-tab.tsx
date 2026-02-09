
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export function BillingAddressTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Address</CardTitle>
        <CardDescription>
          Update your billing address for invoices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" placeholder="123 Main St" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" placeholder="NY" />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="zip">Zip / Postal Code</Label>
                <Input id="zip" placeholder="10001" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
            </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save Address</Button>
      </CardFooter>
    </Card>
  );
}
