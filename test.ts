import "dotenv/config";
import { getPublishedCourses } from "./src/db/queries/courses";

async function test() {
    try {
        await getPublishedCourses();
        console.log("Success");
    } catch (e) {
        console.error(e);
    }
}
test();
