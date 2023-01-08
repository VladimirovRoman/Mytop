import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface TagProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 's' | 'm';
	children: ReactNode;
	color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
	href?: string;
}
