import { AuthView } from '@neondatabase/auth/react';

export const dynamicParams = false;

export default async function AuthPage({ params }: { params: Promise<{ path: string[] }> }) {
    const { path } = await params;
    // Join the path array to get the full path string if needed, or pass path[0] etc.
    // The NEON component expects `pathname` which usually corresponds to the last segment like "sign-in"
    // But checking the docs: <AuthView path={path} />
    // If path is string[] from [...path], we might need to handle it.
    // Actually the docs example: export default async function AuthPage({ params }: { params: Promise<{ path: string }> })
    // But for [...path], params.path is string[].
    // Let's assume the example meant [path] (single segment) or just pass the first segment.
    // However, Neon docs say: "AuthView - with dynamic route segment covers /auth/sign-in, /auth/sign-up..."
    // If the file is /auth/[...path]/page.tsx, then path is array.

    // Let's coerce it to string if acceptable or use the first segment.
    // The example code: <AuthView path={path} /> implies path is a string.
    // So likely the file should be /auth/[path]/page.tsx (single segment) as per docs.
    // Re-reading docs: "Create a dynamic route segment... in app/auth/[path]/page.tsx"
    // Ah, single segment [path], NOT catch-all [...path].

    return (
        <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6 min-h-[50vh]">
            <AuthView path={path[0]} />
        </main>
    );
}
