import { Htag, Button } from '../components';

export default function Home(): JSX.Element {
	return (
		<>
			<Htag tag='h1'> popop </Htag>
			<Button appearance='primary' arrow='right'>
				Кнопка
			</Button>
			<Button appearance='ghost' arrow='right'>
				Кнопка
			</Button>
		</>
	);
}
