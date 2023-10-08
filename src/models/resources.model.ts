interface Resource {
	name: string;
	iconURL: string;
	files: ResourceFile[];
}

interface ResourceFile {
	name: string;
	key: string; // TODO: change to fileURL
}

export { Resource, ResourceFile };
