import httpStatus from "http-status";
import { agent as request } from "supertest";
import app from "../../src/index";
import { getConnection } from "@utils/mongoconnection";

describe("Studyplans API", () => {
	describe("GET /api/study_plans", () => {
		it("should return all study plans", async () => {
			const res = await request(app).get("/api/study_plans");

			expect(res.status).toBe(httpStatus.OK);
			expect(res.body.length).toBe(10);
		});

		// You can add more test cases, like what should happen if the database connection fails, etc.
	});
});

afterAll(async () => {
	const client = await getConnection();
	client?.close();
});
