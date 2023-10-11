// TODO: better to use a mock function for environment variables?
describe("BASE URL when", () => {
	// Mock the process.env
	beforeEach(() => {
		jest.resetModules(); // Reset modules to clear cached values
	});

	describe("NODE_ENV = production", () => {
		it("should return the production host URL", () => {
			process.env.NODE_ENV = "production";

			const BASE_URL = require("@utils/constants").BASE_URL;

			expect(BASE_URL).toBe("https://center-be.stamford.dev");
		});
	});

	describe("NODE_ENV = beta", () => {
		it("should return the beta host URL", () => {
			process.env.NODE_ENV = "beta";

			const BASE_URL = require("@utils/constants").BASE_URL;

			expect(BASE_URL).toBe("https://center-be-beta.stamford.dev");
		});
	});

	describe("default case", () => {
		it("should return the localhost URL with the correct port", () => {
			process.env.NODE_ENV = "local";
			process.env.PORT = "8080";

			const BASE_URL = require("@utils/constants").BASE_URL;

			expect(BASE_URL).toBe("http://localhost:8080");
		});
	});
});
