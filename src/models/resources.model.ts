interface Resource {
	name: string;
	iconURL: string;
	files: ResourceFile[];
}

interface ResourceFile {
	name: string;
	key: string;
}

export { Resource, ResourceFile };
