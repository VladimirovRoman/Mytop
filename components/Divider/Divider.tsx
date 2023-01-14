import { DividerProps } from './Divider.props';
import cn from 'classnames';

import styles from './Divider.module.css';

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
	return <hr className={cn(className, styles.hr)} {...props} />;
};
