import { GetStaticProps } from 'next';
import { useState } from 'react';
import axios from 'axios';

import { Htag, Button, Paragraph, Tag, Rating, Input } from '../components';
import { withLayout } from '../layout/Layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);
	return (
		<>
			<Htag tag='h1'> Header </Htag>
			<Button appearance='primary' arrow='right'>
				Кнопка
			</Button>
			<Button appearance='ghost' arrow='right'>
				Кнопка
			</Button>
			<Paragraph size='p14'>Маленький</Paragraph>
			<Paragraph size='p16'>Средний</Paragraph>
			<Paragraph size='p18'>Большой</Paragraph>
			<Tag size='s'>ghost</Tag>
			<Tag size='m' color='red'>
				red
			</Tag>
			<Tag size='s' color='green'>
				green
			</Tag>
			<Tag color='primary'>lol</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<Input placeholder='Имя' />
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
		firstCategory,
	});
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
