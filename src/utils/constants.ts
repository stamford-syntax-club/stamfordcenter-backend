export const BASE_URL: string = (() => {
	switch (process.env.NODE_ENV) {
		case "production":
			return "https://center-be.stamford.dev";
		case "beta":
			return "https://center-be-beta.stamford.dev";
		default:
			console.warn(`Unexpected NODE_ENV value: ${process.env.NODE_ENV}. Falling back to localhost.`);
			return `http://localhost:${process.env.PORT}`;
	}
})();

export const FILE_ENDPOINT_URL = `${BASE_URL}/api/files`;
