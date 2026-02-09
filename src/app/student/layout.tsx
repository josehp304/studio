
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Award,
  Heart,
  Star,
  HelpCircle,
  History,
  Users,
  MessageSquare,
  LifeBuoy,
  Settings,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { href: '/student/dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
  { href: '/student/profile', label: 'My Profile', icon: User },
  { href: '/student/enrolled-courses', label: 'Enrolled Courses', icon: BookOpen },
  { href: '/student/certificates', label: 'My Certificates', icon: Award },
  { href: '/student/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/student/reviews', label: 'Reviews', icon: Star },
  { href: '/student/quiz-attempts', label: 'My Quiz Attempts', icon: HelpCircle },
  { href: '/student/order-history', label: 'Order History', icon: History },
  { href: '/student/referrals', label: 'Referrals', icon: Users },
  { href: '/student/messages', label: 'Messages', icon: MessageSquare },
  { href: '/student/support-tickets', label: 'Support Ticket', icon: LifeBuoy },
  { href: '/student/settings', label: 'Settings', icon: Settings },
];

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4 lg:w-1/5">
          <div className="p-4 bg-card rounded-lg shadow-sm">
             <div className="flex flex-col items-center space-y-4 mb-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src="https://picsum.photos/seed/student-avatar/200/200" alt="Student" data-ai-hint="student avatar" />
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-primary">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Student</p>
                </div>
            </div>
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-primary/5 hover:text-primary mt-4 border-t pt-4"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
            </nav>
          </div>
        </aside>
        <main className="md:w-3/4 lg:w-4/5">
          {children}
        </main>
      </div>
    </div>
  );
}
