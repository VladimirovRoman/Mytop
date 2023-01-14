import { useState } from 'react';
import cn from 'classnames';

import { SearchProps } from './Search.props';
import { useRouter } from 'next/router';

import SearchIcon from './search.svg';
import { Input } from '../Input/Input';

import styles from './Search.module.css';
import { Button } from '../Button/Button';

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
		if (event.key == 'Enter') {
			goToSearch();
			setSearch('');
		}
	};

	return (
		<div className={cn(className, styles.search)} {...props}>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>

			<Button appearance={'primary'} className={styles.button} onClick={goToSearch}>
				<SearchIcon />
			</Button>
		</div>
	);
};
