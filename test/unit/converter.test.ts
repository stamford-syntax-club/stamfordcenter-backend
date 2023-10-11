import { ObjectId } from "mongodb";
import { convertResultToResource, convertResultToStudyPlan } from "@utils/converter";
import { FILE_ENDPOINT_URL } from "@utils/constants";

describe("convertResultsToResource", () => {
	describe("happy case", () => {
		it("should convert correctly", () => {
			const mockResult = {
				_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
				name: "List of Mock Items",
				iconURI: "resources/mock-icon.png",
				files: [
					{
						name: "Mock1",
						key: "resources/mock1.pdf",
					},
					{
						name: "Mock2",
						key: "resources/mock2.pdf",
					},
				],
			};
			const expected = {
				name: "List of Mock Items",
				iconURL: `${FILE_ENDPOINT_URL}/resources/mock-icon.png`,
				files: [
					{
						name: "Mock1",
						url: `${FILE_ENDPOINT_URL}/resources/mock1.pdf`,
					},
					{
						name: "Mock2",
						url: `${FILE_ENDPOINT_URL}/resources/mock2.pdf`,
					},
				],
			};

			const actual = convertResultToResource(mockResult);

			expect(actual).toEqual(expected);
		});
	});

	describe("when iconURI is undefined", () => {
		it("should give null iconURL", () => {
			const mockResult = {
				_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
				name: "List of Mock Items",
				iconURI: undefined,
				files: [
					{
						name: "Mock1",
						key: "resources/mock1.pdf",
					},
				],
			};
			const expected = {
				name: "List of Mock Items",
				iconURL: null,
				files: [
					{
						name: "Mock1",
						url: `${FILE_ENDPOINT_URL}/resources/mock1.pdf`,
					},
				],
			};

			const actual = convertResultToResource(mockResult);

			expect(actual).toEqual(expected);
		});
	});
});

describe("convertResultToStudyPlan", () => {
	it("should convert correctly", () => {
		const mockResult = {
			_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
			fileKey: "studyplans/mock.pdf",
			major: "Mock Major",
			major_abbrv: "MM",
			faculty: "Mock Faculty",
			language: "Mock Language",
			year: "2020",
		};
		const expected = {
			fileKey: "studyplans/mock.pdf",
			major: "Mock Major",
			major_abbrv: "MM",
			faculty: "Mock Faculty",
			language: "Mock Language",
			year: "2020",
			url: `${FILE_ENDPOINT_URL}/studyplans/mock.pdf`,
		};

		const actual = convertResultToStudyPlan(mockResult);

		expect(actual).toEqual(expected);
	});
});
