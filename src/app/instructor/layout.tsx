
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Megaphone,
  ClipboardList,
  Users,
  HelpCircle,
  BarChart2,
  Award,
  DollarSign,
  Banknote,
  FileText,
  LifeBuoy,
  Settings,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { href: '/instructor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/instructor/profile', label: 'My Profile', icon: User },
  { href: '/instructor/course', label: 'Course', icon: BookOpen },
  { href: '/instructor/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/instructor/assignment', label: 'Assignment', icon: ClipboardList },
  { href: '/instructor/student', label: 'Student', icon: Users },
  { href: '/instructor/quiz', label: 'Quiz', icon: HelpCircle },
  { href: '/instructor/quiz-results', label: 'Quiz Results', icon: BarChart2 },
  { href: '/instructor/certificate', label: 'Certificate', icon: Award },
  { href: '/instructor/earning', label: 'Earning', icon: DollarSign },
  { href: '/instructor/payout', label: 'Payout', icon: Banknote },
  { href: '/instructor/statement', label: 'Statement', icon: FileText },
  { href: '/instructor/support-ticket', label: 'Support Ticket', icon: LifeBuoy },
  { href: '/instructor/settings', label: 'Settings', icon: Settings },
];

export default function InstructorDashboardLayout({
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
                    <AvatarImage src="https://picsum.photos/seed/instructor-avatar/200/200" alt="Instructor" data-ai-hint="instructor avatar" />
                    <AvatarFallback>I</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-primary">Jane Smith</h3>
                    <p className="text-sm text-muted-foreground">Instructor</p>
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
