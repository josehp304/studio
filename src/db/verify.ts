
import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";

async function verify() {
    try {
        console.log("Verifying database connection...");

        // Insert a test user
        const testEmail = `test-${Date.now()}@example.com`;
        const insertedUsers = await db.insert(users).values({
            id: `user_${Date.now()}`,
            name: "Test User",
            email: testEmail,
            role: "STUDENT",
        }).returning();

        console.log("Inserted user:", insertedUsers[0]);

        // Query the user back
        const storedUser = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, testEmail)
        });

        if (storedUser) {
            console.log("Successfully retrieved user:", storedUser);
            console.log("Database verification PASSED!");
        } else {
            console.error("Failed to retrieve user!");
        }

    } catch (error) {
        console.error("Verification failed:", error);
        process.exit(1);
    } finally {
        process.exit(0);
    }
}

verify();
