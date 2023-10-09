interface Resource {
	name: string;
	iconURL: string | null;
	files: ResourceFile[];
}

interface ResourceFile {
	name: string;
	key: string;
	url: string;
}

export { Resource, ResourceFile };
