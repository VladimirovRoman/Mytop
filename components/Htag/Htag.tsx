import { HtagProps } from './Htag.props';
import styles from './Htag.module.css';
import { ReactNode } from 'react';

export const Htag = ({ tag, children }: HtagProps): JSX.Element => {
	const getHeading = (children: ReactNode) => ({
		h1: <h1 className={styles.h1}>{children}</h1>,
		h2: <h2 className={styles.h2}>{children}</h2>,
		h3: <h3 className={styles.h3}>{children}</h3>,
	});

	return getHeading(children)[tag];
};
