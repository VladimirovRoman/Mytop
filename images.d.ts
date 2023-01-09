declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>;
	export default content;
}
declare module '*.png' {
	const content: import('../dist/client/image').StaticImageData;
	export default content;
}

declare module '*.jpg' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}

declare module '*.jpeg' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}

declare module '*.gif' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}

declare module '*.webp' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}

declare module '*.avif' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}

declare module '*.ico' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}

declare module '*.bmp' {
	const content: import('../dist/client/image').StaticImageData;

	export default content;
}
