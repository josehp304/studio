import { Course as UICourse } from './data';

// Type definition for the result of getPublishedCourses
export interface DbCourseWithInstructor {
    id: string;
    title: string;
    description: string | null;
    thumbnailUrl: string | null;
    price: number | null;
    isPublished: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    instructorId: string | null;
    instructor: {
        id: string;
        name: string | null;
        email: string;
        role: "STUDENT" | "INSTRUCTOR" | "ADMIN" | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    } | null;
}

export function mapDbCourseToUiCourse(dbCourse: DbCourseWithInstructor): UICourse {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
        category: 'Development', // Default for now as we don't have categories in DB
        price: (dbCourse.price || 0) / 100, // Convert cents to dollars if stored as integer
        imageUrl: dbCourse.thumbnailUrl || '/placeholder-course.jpg',
        instructor: {
            name: dbCourse.instructor?.name || 'Unknown Instructor',
            avatarUrl: '/placeholder-avatar.jpg'
        },
        rating: 5.0, // Default
        reviewCount: 0,
        studentCount: 0, // Placeholder
        lessons: 0, // Placeholder
        duration: '0h 0m',
        curriculum: [] // Empty for list view
    };
}


export interface DbCourseDetails extends DbCourseWithInstructor {
    modules: {
        id: string;
        title: string;
        position: number | null;
        isPublished: boolean | null;
        lessons: {
            id: string;
            title: string;
            description: string | null;
            duration: string | null; // We don't have duration in DB yet
            isFreePreview: boolean | null;
            position: number | null;
            isPublished: boolean | null;
        }[];
    }[];
}

export function mapDbCourseDetailsToUiCourse(dbCourse: DbCourseDetails): UICourse {
    const baseCourse = mapDbCourseToUiCourse(dbCourse);

    // Calculate total lessons
    const totalLessons = dbCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);

    return {
        ...baseCourse,
        lessons: totalLessons,
        curriculum: dbCourse.modules.map(module => ({
            id: module.id, // Included Module ID
            section: module.title,
            lessons: module.lessons.map(lesson => ({
                id: lesson.id, // Include ID!
                title: lesson.title,
                duration: '10m', // Placeholder as we don't store duration yet
                isPreview: lesson.isFreePreview || false
            }))
        }))
    };
}
