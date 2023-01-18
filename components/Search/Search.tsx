import { useRouter } from 'next/router';
import { useState } from 'react';
import cn from 'classnames';

import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import SearchIcon from './search_icon.svg';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			goToSearch();
		}
	};

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				onKeyDown={handleKeyDown}
				aria-label='Искать по сайту'
			/>
			<Button appearance='primary' className={styles.button} onClick={goToSearch}>
				<SearchIcon />
			</Button>
		</div>
	);
};
