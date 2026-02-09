'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Menu,
  Search,
  BookOpen,
  Briefcase,
  Star,
  Users,
  LayoutGrid,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '../icons/logo';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const navLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Courses',
    href: '/#',
  },
  {
    label: 'Instructor',
    href: '/instructor/dashboard',
    sublinks: [
      { label: 'Dashboard', href: '/instructor/dashboard' },
      { label: 'My Courses', href: '/instructor/course' },
      { label: 'My Profile', href: '/instructor/profile' },
    ],
  },
  {
    label: 'Student',
    href: '#',
    sublinks: [
        { label: 'Student Dashboard', href: '/student/dashboard' },
        { label: 'My Profile', href: '/student/profile' },
        { label: 'Enrolled Course', href: '/student/enrolled-courses' },
        { label: 'My Certificates', href: '/student/certificates' },
        { label: 'Wishlist', href: '/student/wishlist' },
        { label: 'Reviews', href: '/student/reviews' },
        { label: 'My Quiz Attempts', href: '/student/quiz-attempts' },
        { label: 'Order History', href: '/student/order-history' },
    ]
  },
  {
    label: 'Pages',
    href: '/#',
    sublinks: [
      { label: 'About Us', href: '/#' },
      { label: 'Contact', href: '/#' },
      { label: 'Cart', href: '/cart' },
      { label: 'Checkout', href: '/checkout' },
    ],
  },
  {
    label: 'Blog',
    href: '/#',
  },
];

const NavLink = ({
  label,
  href,
  sublinks,
}: {
  label: string;
  href: string;
  sublinks?: { label: string; href: string }[];
}) => {
  if (sublinks) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-base font-medium text-foreground hover:text-primary"
          >
            {label} <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sublinks.map((link) => (
            <DropdownMenuItem key={link.label} asChild>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={href}
      className="text-base font-medium text-foreground transition-colors hover:text-primary"
    >
      {label}
    </Link>
  );
};

export function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link href="/" aria-label="Back to homepage">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2">
                <div className="relative">
                  <Input placeholder="Search..." className="pr-10" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="ghost" size="icon">
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Shopping Cart</span>
                </Link>
            </Button>
            <Link href="/login">
              <Button className="font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                Login
              </Button>
            </Link>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <SheetHeader className="p-6 pb-4 border-b">
                 <SheetTitle>
                    <Link href="/" onClick={() => setOpen(false)} className="inline-block">
                        <Logo />
                    </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 pt-4">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                       <Link
                          href={link.href}
                          onClick={() => !link.sublinks && setOpen(false)}
                          className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                       {link.sublinks && (
                        <div className="flex flex-col pl-4 mt-2 gap-2">
                          {link.sublinks.map((sublink) => (
                             <Link
                              key={sublink.label}
                              href={sublink.href}
                              onClick={() => setOpen(false)}
                              className="text-base text-muted-foreground transition-colors hover:text-primary"
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                       )}
                    </div>
                  ))}
                </nav>
              </div>
               <div className="border-t p-6 flex flex-col gap-4">
                <Button asChild variant="ghost" className="justify-start gap-2">
                  <Link href="/cart" onClick={() => setOpen(false)}>
                      <ShoppingCart className="h-5 w-5" />
                      Shopping Cart
                  </Link>
                </Button>
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button className="w-full font-bold text-white bg-gradient-to-r from-[#FF725E] to-[#F54B8D] hover:from-[#f86552] hover:to-[#e44281]">
                    Login
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
