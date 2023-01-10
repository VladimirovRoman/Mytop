import { useState } from 'react';

import { Htag, Button, Paragraph, Tag, Rating } from '../components';
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);

	return (
		<main>
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
		</main>
	);
}
export default withLayout(Home);
