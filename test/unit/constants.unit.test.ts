describe("BASE URL", () => {
	// Mock the process.env variable
	const originalEnv = process.env;
	beforeEach(() => {
		jest.resetModules(); // Reset modules to clear cached values
		process.env = { ...originalEnv }; // Restore the original process.env
	});

	afterAll(() => {
		process.env = originalEnv; // Restore process.env to its original state after all tests
	});

	it("should return the production host URL", () => {
		process.env.NODE_ENV = "production";

		const BASE_URL = require("../../src/utils/constants").BASE_URL;

		expect(BASE_URL).toBe("https://center-be.stamford.dev");
	});

	it("should return the beta host URL", () => {
		process.env.NODE_ENV = "beta";

		const BASE_URL = require("../../src/utils/constants").BASE_URL;

		expect(BASE_URL).toBe("https://center-be-beta.stamford.dev");
	});

	it("should return the localhost URL with the correct port", () => {
		process.env.NODE_ENV = "local";
		process.env.PORT = "8080"; // Set the expected port for your local development

		const BASE_URL = require("../../src/utils/constants").BASE_URL;

		expect(BASE_URL).toBe("http://localhost:8080");
	});
});
