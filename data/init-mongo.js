db = db.getSiblingDB("stamfordcenter");
db.resources.insertMany([
	{
		_id: "65212e74aac38c41505660b3",
		name: "Class Schedules & Full Name Lists",
		iconURI: "some uri",
		files: [
			{
				name: "UG Class Schedule Term 1-2023",
				key: "1_2023_class_schedule.pdf",
			},
		],
	},
	{
		_id: "652133117f16520e8dee6d89",
		name: "Academic Calendars",
		iconURI: "some uri again",
		files: [
			{
				name: "Academic Calendar Term 1-2023",
				key: "1_2023_academic_calendar.pdf",
			},
			{
				name: "Academic Calendar Term 2-2023",
				key: "2_2023_academic_calendar.pdf",
			},
		],
	},
]);

db.quicklinks.insertMany([
	{
		_id: "65380725d28087758a436d7c",
		title: "Blackboard",
		description: "blackboard",
		imgURI: "some uri",
		link: "https://learn.stamford.edu/",
		originalLink: "https://learn.stamford.edu/",
	},
	{
		_id: "65380725d28087758a436d7d",
		title: "Registrar",
		description: "registrar",
		imgURI: "some uri",
		link: "https://reg.stamford.edu/",
		originalLink: "https://reg.stamford.edu/",
	},
	{
		_id: "65380725d28087758a436d7e",
		title: "Library",
		description: "library",
		imgURI: "some uri",
		link: "https://library.stamford.edu/",
		originalLink: "https://library.stamford.edu/",
	},
]);

db.study_plans.insertMany([
	{
		_id: "64d23756878817eb8038e3c0",
		major: "Entrepreneurship",
		faculty: "Business and Technology",
		language: "Bilingual",
		year: "2022",
		fileKey: "2022_ent_bil.pdf",
		major_abbrv: "ENT",
	},
	{
		_id: "64d238ed878817eb8038e3c2",
		major: "Entrepreneurship",
		faculty: "Business and Technology",
		language: "International",
		year: "2022",
		fileKey: "2022_ent_int.pdf",
		major_abbrv: "ENT",
	},
	{
		_id: "64d23966878817eb8038e3c3",
		major: "Airline Business Management",
		faculty: "Business and Technology",
		language: "Bilingual",
		year: "2021",
		fileKey: "2021_abm_bil.pdf",
		major_abbrv: "ABM",
	},
	{
		_id: "64d239ad878817eb8038e3c4",
		major: "Airline Business Management",
		faculty: "Business and Technology",
		language: "International",
		year: "2021",
		fileKey: "2021_abm_int.pdf",
		major_abbrv: "ABM",
	},
	{
		_id: "64d239cd878817eb8038e3c5",
		major: "Accountancy",
		faculty: "Business and Technology",
		language: "Bilingual",
		year: "2021",
		fileKey: "2021_acc_bil.pdf",
		major_abbrv: "ACC",
	},
	{
		_id: "64d23a11878817eb8038e3c6",
		major: "Accountancy",
		faculty: "Business and Technology",
		language: "International",
		year: "2021",
		fileKey: "2021_acc_int.pdf",
		major_abbrv: "ACC",
	},
	{
		_id: "64d4f7e4e8e1595c09bed59c",
		major: "Advertising and Digital Marketing Communication",
		faculty: "Communication Arts and Design",
		language: "Bilingual",
		year: "2021",
		fileKey: "2021_admc_bil.pdf",
		major_abbrv: "ADMC",
	},
	{
		_id: "64d4f872e8e1595c09bed59d",
		major: "Advertising and Digital Marketing Communication",
		faculty: "Communication Arts and Design",
		language: "International",
		year: "2021",
		fileKey: "2021_admc_int.pdf",
		major_abbrv: "ADMC",
	},
	{
		_id: "64d4f88ee8e1595c09bed59e",
		major: "Creative Media Design",
		faculty: "Communication Arts and Design",
		language: "Bilingual",
		year: "2021",
		fileKey: "2021_cmd_bil.pdf",
		major_abbrv: "CMD",
	},
	{
		_id: "64d4f8b3e8e1595c09bed59f",
		major: "Creative Media Design",
		faculty: "Communication Arts and Design",
		language: "International",
		year: "2021",
		fileKey: "2021_cmd_int.pdf",
		major_abbrv: "CMD",
	},
]);
