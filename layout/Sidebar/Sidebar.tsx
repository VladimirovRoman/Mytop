import { Menu } from '../Menu/Menu';
import { SidebarProps } from './Sidebar.props';
import cn from 'classnames';

import Logo from '../logo.svg';
import styles from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<div>поиск</div>
			<Menu />
		</div>
	);
};
