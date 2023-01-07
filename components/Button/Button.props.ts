import { HTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode;
	appearance: 'primary' | 'ghost';
	arrow?: 'right' | 'down' | 'none';
}
