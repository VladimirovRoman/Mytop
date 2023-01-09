import cn from 'classnames';

import ArrowIcon from './arrow.svg';
import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

export const Button = ({
	arrow = 'none',
	appearance,
	children,
	className,
	...props
}: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
			})}
			{...props}
		>
			{children}
			{arrow != 'none' && (
				<span
					className={cn(styles.arrow, {
						[styles.down]: arrow == 'down',
					})}
				>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
