import { ForwardedRef, forwardRef } from 'react';

import cn from 'classnames';
import { CardProps } from './Card.props';
import styles from './Card.module.css';

export const Card = forwardRef(
	({ color = 'white', children, className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
		return (
			<div
				className={cn(styles.card, className, {
					[styles.blue]: color == 'blue',
					[styles.blue]: color == 'blue',
				})}
				{...props}
				ref={ref}
			>
				{children}
			</div>
		);
	}
);
