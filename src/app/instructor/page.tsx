
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InstructorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/instructor/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Redirecting to your dashboard...</p>
    </div>
  );
}
