import httpStatus from "http-status";
import { agent as request } from "supertest";
import app from "../../src/app";
import { getConnection } from "@utils/mongoconnection";

describe("Resources API", () => {
	describe("GET /api/resources/study_plans", () => {
		it("should return all data in study plan page", async () => {
			const res = await request(app).get("/api/resources/study_plans");

			expect(res.status).toBe(httpStatus.OK);
			expect(Array.isArray(res.body)).toBe(true); // Check if response body is an array
			expect(res.body.length).toBe(10);
		});
	});

	describe("GET /api/resources/resources/", () => {
		it("should return all data in resources page", async () => {
			const res = await request(app).get("/api/resources/resources");

			expect(res.status).toBe(httpStatus.OK);
			expect(Array.isArray(res.body)).toBe(true);
			expect(res.body.length).toBe(2);
		});
	});

  describe("GET /api/resources/quicklinks/", () => {
    it("should return all data for quicklinks page", async () => {
      const res = await request(app).get("/api/resources/quicklinks");

      expect(res.status).toBe(httpStatus.OK);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(3);
    });
  });

	describe("GET /api/resources/ayo-brother", () => {
		it("should return 400 invalid page name", async () => {
			const res = await request(app).get("/api/resources/ayo-brother");

			expect(res.status).toBe(httpStatus.BAD_REQUEST);
		});
	});

	describe("GET /api/resources/", () => {
		it("should return 404 not found", async () => {
			const res = await request(app).get("/api/resources/");

			expect(res.status).toBe(httpStatus.NOT_FOUND);
		});
	});

	describe("GET /api/resources//", () => {
		it("should return 404 not found", async () => {
			const res = await request(app).get("/api/resources//");

			expect(res.status).toBe(httpStatus.NOT_FOUND);
		});
	});

	describe("Database connection failure", () => {
		it("should return 500", async () => {
			const client = await getConnection();
			client?.close(); // simulate connection failure

			const res = await request(app).get("/api/resources/study_plans");

			expect(res.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
		});
	});
});

afterAll(async () => {
	const client = await getConnection();
	client?.close();
});
