
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { courses } from "@/lib/data";
import { CreditCard, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const cartItems = courses.slice(0, 2);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = 20;
  const total = subtotal - discount;

  return (
    <div>
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-primary font-headline mb-2">Shopping Cart</h2>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <section className="py-12">
        <div className="container mx-auto">
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-4">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={120}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint="course thumbnail"
                          />
                          <div className="flex-grow">
                            <Link href={`/courses/${item.id}`} className="font-semibold text-primary hover:text-accent">
                              {item.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">By {item.instructor.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-primary">${item.price.toFixed(2)}</p>
                            {item.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>
                            )}
                          </div>
                          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Coupon Code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 border-t pt-6">
                    <div className="flex justify-between w-full font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button asChild size="lg" className="w-full font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                      <Link href="/checkout">
                        <CreditCard className="mr-2 h-5 w-5" /> Checkout
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold mb-4">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any courses to your cart yet.</p>
              <Button asChild size="lg" className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                <Link href="/">Browse Courses</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
