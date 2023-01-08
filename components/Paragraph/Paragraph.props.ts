import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ParagraphProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	size?: 'p14' | 'p16' | 'p18';
	children: ReactNode;
}
