import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
	return <header {...props}>Header</header>;
};
