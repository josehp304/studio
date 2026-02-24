import { pgTable, text, serial, integer, boolean, timestamp, uuid, uniqueIndex, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    role: text("role", { enum: ["STUDENT", "INSTRUCTOR", "ADMIN"] }).default("STUDENT"),
    settings: jsonb("settings").default({}),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const courses = pgTable("courses", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    thumbnailUrl: text("thumbnail_url"),
    price: integer("price").default(0), // stored in cents
    instructorId: text("instructor_id").references(() => users.id),
    isPublished: boolean("is_published").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const modules = pgTable("modules", {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    position: integer("position").default(0),
    isPublished: boolean("is_published").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const lessons = pgTable("lessons", {
    id: uuid("id").defaultRandom().primaryKey(),
    moduleId: uuid("module_id").references(() => modules.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    videoUrl: text("video_url"), // Optional URL
    driveVideoId: text("drive_video_id"), // Explicit drive Video ID
    position: integer("position").default(0),
    isPublished: boolean("is_published").default(false),
    isFreePreview: boolean("is_free_preview").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const enrollments = pgTable("enrollments", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    lessonId: uuid("lesson_id").references(() => lessons.id, { onDelete: "cascade" }),
    isCompleted: boolean("is_completed").default(false),
    lastWatchedAt: timestamp("last_watched_at").defaultNow(),
}, (t) => [
    uniqueIndex("user_lesson_idx").on(t.userId, t.lessonId)
]);

export const courseAnnouncements = pgTable("course_announcements", {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const assignments = pgTable("assignments", {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    dueDate: timestamp("due_date"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const assignmentSubmissions = pgTable("assignment_submissions", {
    id: uuid("id").defaultRandom().primaryKey(),
    assignmentId: uuid("assignment_id").references(() => assignments.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    contentUrl: text("content_url"),
    grade: integer("grade"),
    status: text("status", { enum: ["PENDING", "GRADED"] }).default("PENDING"),
    submittedAt: timestamp("submitted_at").defaultNow(),
});

export const quizzes = pgTable("quizzes", {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const quizQuestions = pgTable("quiz_questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }),
    question: text("question").notNull(),
    options: jsonb("options").notNull(), // array of strings
    correctOption: integer("correct_option").notNull(), // index
});

export const quizSubmissions = pgTable("quiz_submissions", {
    id: uuid("id").defaultRandom().primaryKey(),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    score: integer("score"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const certificates = pgTable("certificates", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    certificateUrl: text("certificate_url"),
    issuedAt: timestamp("issued_at").defaultNow(),
});

export const purchases = pgTable("purchases", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    courseId: uuid("course_id").references(() => courses.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(), // stored in cents
    createdAt: timestamp("created_at").defaultNow(),
});

export const payouts = pgTable("payouts", {
    id: uuid("id").defaultRandom().primaryKey(),
    instructorId: text("instructor_id").references(() => users.id, { onDelete: "cascade" }),
    amount: integer("amount").notNull(),
    status: text("status", { enum: ["PENDING", "COMPLETED"] }).default("PENDING"),
    createdAt: timestamp("created_at").defaultNow(),
    processedAt: timestamp("processed_at"),
});

export const supportTickets = pgTable("support_tickets", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    subject: text("subject").notNull(),
    status: text("status", { enum: ["OPEN", "IN_PROGRESS", "RESOLVED"] }).default("OPEN"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const ticketMessages = pgTable("ticket_messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    ticketId: uuid("ticket_id").references(() => supportTickets.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

import { relations } from "drizzle-orm";

export const usersRelations = relations(users, ({ many }) => ({
    enrollments: many(enrollments),
    progress: many(userProgress),
    assignmentSubmissions: many(assignmentSubmissions),
    quizSubmissions: many(quizSubmissions),
    certificates: many(certificates),
    purchases: many(purchases),
    payouts: many(payouts),
    supportTickets: many(supportTickets),
    ticketMessages: many(ticketMessages),
}));

export const coursesRelations = relations(courses, ({ many, one }) => ({
    modules: many(modules),
    instructor: one(users, {
        fields: [courses.instructorId],
        references: [users.id],
    }),
    enrollments: many(enrollments),
    announcements: many(courseAnnouncements),
    assignments: many(assignments),
    quizzes: many(quizzes),
    certificates: many(certificates),
    purchases: many(purchases),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
    course: one(courses, {
        fields: [modules.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    module: one(modules, {
        fields: [lessons.moduleId],
        references: [modules.id],
    }),
    progress: many(userProgress),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
    user: one(users, {
        fields: [enrollments.userId],
        references: [users.id],
    }),
    course: one(courses, {
        fields: [enrollments.courseId],
        references: [courses.id],
    }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    user: one(users, {
        fields: [userProgress.userId],
        references: [users.id],
    }),
    lesson: one(lessons, {
        fields: [userProgress.lessonId],
        references: [lessons.id],
    }),
}));

export const courseAnnouncementsRelations = relations(courseAnnouncements, ({ one }) => ({
    course: one(courses, {
        fields: [courseAnnouncements.courseId],
        references: [courses.id],
    }),
}));

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
    course: one(courses, {
        fields: [assignments.courseId],
        references: [courses.id],
    }),
    submissions: many(assignmentSubmissions),
}));

export const assignmentSubmissionsRelations = relations(assignmentSubmissions, ({ one }) => ({
    assignment: one(assignments, {
        fields: [assignmentSubmissions.assignmentId],
        references: [assignments.id],
    }),
    user: one(users, {
        fields: [assignmentSubmissions.userId],
        references: [users.id],
    }),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
    course: one(courses, {
        fields: [quizzes.courseId],
        references: [courses.id],
    }),
    questions: many(quizQuestions),
    submissions: many(quizSubmissions),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
    quiz: one(quizzes, {
        fields: [quizQuestions.quizId],
        references: [quizzes.id],
    }),
}));

export const quizSubmissionsRelations = relations(quizSubmissions, ({ one }) => ({
    quiz: one(quizzes, {
        fields: [quizSubmissions.quizId],
        references: [quizzes.id],
    }),
    user: one(users, {
        fields: [quizSubmissions.userId],
        references: [users.id],
    }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
    user: one(users, {
        fields: [certificates.userId],
        references: [users.id],
    }),
    course: one(courses, {
        fields: [certificates.courseId],
        references: [courses.id],
    }),
}));

export const purchasesRelations = relations(purchases, ({ one }) => ({
    user: one(users, {
        fields: [purchases.userId],
        references: [users.id],
    }),
    course: one(courses, {
        fields: [purchases.courseId],
        references: [courses.id],
    }),
}));

export const payoutsRelations = relations(payouts, ({ one }) => ({
    instructor: one(users, {
        fields: [payouts.instructorId],
        references: [users.id],
    }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one, many }) => ({
    user: one(users, {
        fields: [supportTickets.userId],
        references: [users.id],
    }),
    messages: many(ticketMessages),
}));

export const ticketMessagesRelations = relations(ticketMessages, ({ one }) => ({
    ticket: one(supportTickets, {
        fields: [ticketMessages.ticketId],
        references: [supportTickets.id],
    }),
    user: one(users, {
        fields: [ticketMessages.userId],
        references: [users.id],
    }),
}));
