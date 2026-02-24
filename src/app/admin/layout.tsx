import Link from 'next/link';
import { Home, Users, BookOpen, Layers, PlayCircle, ClipboardList } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="w-64 flex-none border-r bg-card p-4 hidden md:block">
                <h2 className="mb-6 px-2 text-xl font-bold tracking-tight text-foreground">Admin Panel</h2>
                <nav className="space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Home className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Users className="h-4 w-4" /> Users
                    </Link>
                    <Link href="/admin/courses" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <BookOpen className="h-4 w-4" /> Courses
                    </Link>
                    <Link href="/admin/modules" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Layers className="h-4 w-4" /> Modules
                    </Link>
                    <Link href="/admin/lessons" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <PlayCircle className="h-4 w-4" /> Lessons
                    </Link>
                    <Link href="/admin/enrollments" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <ClipboardList className="h-4 w-4" /> Enrollments
                    </Link>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto p-8">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
