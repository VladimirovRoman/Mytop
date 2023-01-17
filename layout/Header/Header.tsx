import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import cn from 'classnames';
import Logo from '../logo.svg';
import { HeaderProps } from './Header.props';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { Sidebar } from '../Sidebar/Sidebar';
import styles from './Header.module.css';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setIsOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20,
			},
		},
		closed: {
			opacity: 0,
			x: '100%',
		},
	};

	return (
		<header className={cn(styles.header)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)} />
			<motion.div
				className={styles.mobileMenu}
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'close'}
			>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance='white'
					icon='close'
					onClick={() => setIsOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
