import { ObjectId } from "mongodb";
import { convertResultToQuickLink, convertResultToResource, convertResultToStudyPlan } from "@utils/converter";
import { FILE_ENDPOINT_URL } from "@utils/constants";

const consoleWarnSpy = jest.spyOn(console, "warn");

describe("convertResultsToResource", () => {
	describe("when every field is present", () => {
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

	describe("when fields are missing", () => {
		it("should return as undefined and log result.id + fields that are missing", () => {
			const mockResult = {
				_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
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

			const actual = convertResultToResource(mockResult);

			expect(actual).toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				`ResourceConverter: Error: Missing field 'name,iconURI' in result id: ${mockResult._id} to create Resource`,
			);
		});
	});
});

describe("convertResultToStudyPlan", () => {
	describe("when every field is present", () => {
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

	describe("when fields are missing", () => {
		it("should return as undefined and log result.id + fields that are missing", () => {
			const mockResult = {
				_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
				fileKey: "studyplans/mock.pdf",
				major: "Mock Major",
				major_abbrv: "MM",
				faculty: "Mock Faculty",
			};

			const actual = convertResultToStudyPlan(mockResult);

			expect(actual).toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				`StudyPlanConverter: Error: Missing field 'language,year' in result id: ${mockResult._id} to create StudyPlan`,
			);
		});
	});
});

describe("convertResultToQuickLink", () => {
	describe("when every field is present", () => {
		it("should convert correctly", () => {
			const mockResult = {
				_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
				title: "Mock Title",
				description: "Mock Description",
				imgURI: "quicklinks/mock.png",
				link: "https://mock.com",
				originalLink: "https://mock.com",
			};
			const expected = {
				title: "Mock Title",
				description: "Mock Description",
				imgURL: `${FILE_ENDPOINT_URL}/quicklinks/mock.png`,
				link: "https://mock.com",
				originalLink: "https://mock.com",
			};

			const actual = convertResultToQuickLink(mockResult);

			expect(actual).toEqual(expected);
		});
	});

	describe("when fields are missing", () => {
		it("should return as undefined and log result.id + fields that are missing", () => {
			const mockResult = {
				_id: new ObjectId("5f9e2a3b9d3b9a0d9c9d3b9a"),
				imgURI: "quicklinks/mock.png",
				link: "https://mock.com",
				originalLink: "https://mock.com",
			};

			const actual = convertResultToQuickLink(mockResult);

			expect(actual).toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				`QuickLinkConverter: Error: Missing field 'title,description' in result id: ${mockResult._id} to create QuickLink`,
			);
		});
	});
});
