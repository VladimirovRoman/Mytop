import { GetStaticProps } from 'next';
import { useState } from 'react';
import axios from 'axios';

import { Htag, Button, Paragraph, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<>
			<Htag tag='h1'> Заголовок </Htag>
			<Button appearance='primary' arrow='right'>
				Кнопка
			</Button>
			<Button appearance='ghost' arrow='right'>
				Кнопка
			</Button>
			<Paragraph size='p14'>Маленький</Paragraph>
			<Tag size='s'>ghost</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
		</>
	);
}
export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	
	const { data: menu } = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
		{
			firstCategory,
		}
	);
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
