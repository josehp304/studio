
"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses } from "@/lib/data";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckoutPage() {
  const cartItems = courses.slice(0, 2);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal;

  return (
    <div>
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary font-headline mb-2">Checkout</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="gb">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York"/>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="NY"/>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001"/>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="create-account" />
                    <Label htmlFor="create-account" className="font-normal">Create an account?</Label>
                 </div>
                </CardContent>
              </Card>
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="card" className="space-y-4">
                    <div className="flex items-center space-x-3 rounded-md border p-4">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="font-medium">Credit / Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-3 rounded-md border p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="font-medium">PayPal</Label>
                    </div>
                  </RadioGroup>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="**** **** **** ****" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="***" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Image src={item.imageUrl} alt={item.title} width={64} height={42} className="rounded-md object-cover" data-ai-hint="course thumbnail"/>
                         <span className="text-sm font-medium text-primary w-40 truncate">{item.title}</span>
                      </div>
                      <span className="font-semibold text-sm">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </CardContent>
                <CardContent className="border-t pt-4 space-y-2">
                   <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t pt-6">
                    <div className="flex justify-between w-full font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button size="lg" className="w-full font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                      <Lock className="mr-2 h-5 w-5" /> Place Order
                    </Button>
                </CardFooter>
              </Card>
               <p className="text-xs text-muted-foreground mt-4 text-center">
                By placing your order, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
