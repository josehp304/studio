import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
    users, courses, modules, lessons, enrollments,
    courseAnnouncements, assignments, assignmentSubmissions,
    quizzes, quizQuestions, quizSubmissions, certificates,
    purchases, payouts, supportTickets, ticketMessages
} from "./schema";

async function seed() {
    if (!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool, { schema: { users, courses, modules, lessons, enrollments, courseAnnouncements, assignments, assignmentSubmissions, quizzes, quizQuestions, quizSubmissions, certificates, purchases, payouts, supportTickets, ticketMessages } });

    try {
        console.log("Seeding database using node-postgres Pool...");

        // 1. Create Instructor
        const instructorId = `instructor_${Date.now()}`;
        const [instructor] = await db.insert(users).values({
            id: instructorId,
            name: "John Doe (Instructor)",
            email: `instructor_${Date.now()}@example.com`,
            role: "INSTRUCTOR",
        }).returning();
        console.log("Created Instructor:", instructor.email);

        // 2. Create Student
        const studentId = `student_${Date.now()}`;
        const [student] = await db.insert(users).values({
            id: studentId,
            name: "Jane Smith (Student)",
            email: `student_${Date.now()}@example.com`,
            role: "STUDENT",
        }).returning();
        console.log("Created Student:", student.email);

        // 3. Create Course
        const [course] = await db.insert(courses).values({
            title: "Advanced React Patterns",
            description: "Learn advanced concepts like streaming, proxying, and ORMs with Next.js App Router.",
            price: 4999, // $49.99
            thumbnailUrl: "https://via.placeholder.com/600x400.png?text=Advanced+React",
            instructorId: instructor.id,
            isPublished: true,
        }).returning();
        console.log("Created Course:", course.title);

        // 4. Create Module
        const [courseModule] = await db.insert(modules).values({
            courseId: course.id,
            title: "Video Streaming Architecture",
            position: 1,
            isPublished: true,
        }).returning();
        console.log("Created Module:", courseModule.title);

        // 5. Create Lessons
        const [lesson1] = await db.insert(lessons).values({
            moduleId: courseModule.id,
            title: "Introduction to Google Drive Streaming",
            description: "An overview of how proxying works to securely stream video files.",
            position: 1,
            isPublished: true,
            isFreePreview: true,
            // Replace this with a real Drive Video ID during your manual testing!
            driveVideoId: "YOUR_GOOGLE_DRIVE_VIDEO_ID_HERE",
        }).returning();

        const [lesson2] = await db.insert(lessons).values({
            moduleId: courseModule.id,
            title: "Implementing Range Headers",
            description: "Handling 206 Partial Content.",
            position: 2,
            isPublished: true,
            isFreePreview: false,
            driveVideoId: "ANOTHER_DRIVE_ID_HERE",
        }).returning();

        // 6. Enroll Student in Course
        await db.insert(enrollments).values({
            userId: student.id,
            courseId: course.id,
        });
        console.log("Enrolled Student in Course!");

        // 7. Create Course Announcement
        await db.insert(courseAnnouncements).values({
            courseId: course.id,
            title: "Welcome to Advanced React Patterns!",
            content: "We're excited to have you here. Please check the first module.",
        });
        console.log("Created Course Announcement.");

        // 8. Create Assignment
        const [assignment] = await db.insert(assignments).values({
            courseId: course.id,
            title: "Build a Custom Hook",
            description: "Create a custom React hook for fetching data.",
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
        }).returning();
        console.log("Created Assignment.");

        // 9. Create Assignment Submission
        await db.insert(assignmentSubmissions).values({
            assignmentId: assignment.id,
            userId: student.id,
            contentUrl: "https://github.com/student/custom-hook",
            status: "PENDING",
        });
        console.log("Created Assignment Submission.");

        // 10. Create Quiz
        const [quiz] = await db.insert(quizzes).values({
            courseId: course.id,
            title: "React Fundamentals Quiz",
            description: "Test your knowledge of basic React concepts.",
        }).returning();
        console.log("Created Quiz.");

        // 11. Create Quiz Question
        await db.insert(quizQuestions).values({
            quizId: quiz.id,
            question: "What is JSX?",
            options: ["A JS extension", "A new language", "A CSS framework", "None of the above"],
            correctOption: 0,
        });
        console.log("Created Quiz Question.");

        // 12. Create Quiz Submission
        await db.insert(quizSubmissions).values({
            quizId: quiz.id,
            userId: student.id,
            score: 100,
        });
        console.log("Created Quiz Submission.");

        // 13. Create Certificate
        await db.insert(certificates).values({
            userId: student.id,
            courseId: course.id,
            certificateUrl: "https://example.com/certificates/123",
        });
        console.log("Created Certificate.");

        // 14. Create Purchase
        await db.insert(purchases).values({
            userId: student.id,
            courseId: course.id,
            amount: course.price ?? 4999, // 4999
        });
        console.log("Created Purchase.");

        // 15. Create Payout
        await db.insert(payouts).values({
            instructorId: instructor.id,
            amount: 4000, // E.g., instructor gets $40.00
            status: "PENDING",
        });
        console.log("Created Payout.");

        // 16. Create Support Ticket
        const [ticket] = await db.insert(supportTickets).values({
            userId: student.id,
            subject: "Help with video streaming playback",
            status: "OPEN",
        }).returning();
        console.log("Created Support Ticket.");

        // 17. Create Ticket Message
        await db.insert(ticketMessages).values({
            ticketId: ticket.id,
            userId: student.id,
            message: "I am getting a 404 error when trying to play the first video. What should I do?",
        });
        console.log("Created Ticket Message.");

        console.log(`
        ✅ Seed complete!
        Course ID: ${course.id}
        Free Lesson ID: ${lesson1.id}
        Premium Lesson ID: ${lesson2.id}
        Student ID (Enrolled): ${student.id}
        Student Email: ${student.email}
        `);

    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        pool.end();
        process.exit(0);
    }
}

seed();
