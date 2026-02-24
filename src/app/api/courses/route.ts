import { NextResponse } from 'next/server';
import { getPublishedCourses } from '@/db/queries/courses';

export async function GET() {
    try {
        const courses = await getPublishedCourses();
        return NextResponse.json(courses);
    } catch (error) {
        console.error('[COURSES_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
