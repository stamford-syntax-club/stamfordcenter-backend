import httpStatus from "http-status";
import { agent as request } from "supertest";
import app from "../../src/app";
import { getConnection } from "@utils/mongoconnection";

describe("Studyplans API", () => {
	describe("GET /api/study_plans", () => {
		it("should return all study plans", async () => {
			const res = await request(app).get("/api/study_plans");

			expect(res.status).toBe(httpStatus.OK);
			expect(Array.isArray(res.body)).toBe(true); // Check if response body is an array
			expect(res.body.length).toBe(10);
		});

		it("should return 500 if database connection fails", async () => {
			const client = await getConnection();
			client?.close(); // simulate connection failure

			const res = await request(app).get("/api/study_plans");

			expect(res.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});
	});
});

afterAll(async () => {
	const client = await getConnection();
	client?.close();
});
