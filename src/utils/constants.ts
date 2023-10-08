export const BASE_URL: string = (() => {
	switch (process.env.NODE_ENV) {
		case "production":
			return "https://center-be.stamford.dev";
		case "beta":
			return "https://center-be-beta.stamford.dev";
		default:
			return `http://localhost:${process.env.PORT}`;
	}
})();
