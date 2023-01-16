import cn from 'classnames';
import { TextareaProps } from './Textarea.props';

import styles from './Textarea.module.css';
import { ForwardedRef, forwardRef } from 'react';

export const Textarea = forwardRef(
	({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
		return (
			<div className={cn(className, styles.textareaWrapper)}>
				<textarea
					className={cn(styles.textarea, {
						[styles.error]: error,
					})}
					ref={ref}
					{...props}
				/>
				{<span className={styles.errorMessage}>{error?.message}</span>}
			</div>
		);
	}
);
