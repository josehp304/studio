
import { auth } from '@/lib/auth/server';
import { getCourseById, getUserEnrollment } from '@/db/queries/courses';
import { getUserProgress } from '@/db/queries/progress';
import { mapDbCourseDetailsToUiCourse } from '@/lib/mappers';
import { redirect } from 'next/navigation';
import { LessonPlayer } from '@/components/lesson-player';

export default async function WatchCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.getSession();

  if (!session?.data?.user?.id) {
    redirect(`/auth/sign-in?callbackUrl=/courses/${id}/watch`);
  }

  const userId = session.data.user.id;

  // 1. Check Enrollment
  const enrollment = await getUserEnrollment(userId, id);
  if (!enrollment) {
    redirect(`/courses/${id}`);
  }

  // 2. Fetch Course Details
  const dbCourse = await getCourseById(id);
  if (!dbCourse) {
    return <div>Course not found</div>;
  }
  const course = mapDbCourseDetailsToUiCourse(dbCourse as any);

  // 3. Fetch Progress
  const progress = await getUserProgress(userId, id);

  return (
    <LessonPlayer
      course={course}
      progress={progress}
      userId={userId}
    />
  );
}
