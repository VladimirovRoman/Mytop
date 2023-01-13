export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export interface PageAdvantage {
	_id: string;
	title: string;
	description: string;
}

export interface HhData {
	_id?: string;
	count?: number;
	juniorSalary?: number;
	middleSalary?: number;
	seniorSalary?: number;
	updatedAt?: Date;
}

export interface PageModel {
	tags: string[];
	_id: string;
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	seoText?: string;
	tagsTitle: string;
	metaTitle: string;
	metaDescription: string;
	firstCategory: TopLevelCategory;
	advantages?: PageAdvantage[];
	createdAt: Date;
	updatedAt: Date;
	hh?: HhData;
}
