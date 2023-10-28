export const BASE_URL: string = (() => {
	switch (process.env.APP_ENV) {
		case "production":
			return "https://center-be.stamford.dev";
		case "beta":
			return "https://center-be-beta.stamford.dev";
		default:
			console.warn(`Unexpected APP_ENV value: ${process.env.APP_ENV}. Falling back to localhost.`);
			return `http://localhost:${process.env.PORT}`;
	}
})();

export const FILE_ENDPOINT_URL = `${BASE_URL}/api/files`;
