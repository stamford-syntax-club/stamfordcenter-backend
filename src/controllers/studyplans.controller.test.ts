import httpStatus from "http-status";
import { agent as request } from "supertest";
import app from "../index";

describe("Studyplans API", () => {
	describe("GET /api/study_plans", () => {
		it("should return all study plans", async () => {
			const res = await request(app).get("/api/study_plans");

			expect(res.status).toBe(httpStatus.OK);
			// Assuming the study plans are an array
			expect(Array.isArray(res.body)).toBe(true);

			// If you know the expected output, you can also check that
			// expect(res.body).toEqual([...]);
		});

		// You can add more test cases, like what should happen if the database connection fails, etc.
	});
});
