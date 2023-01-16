import { ReviewFormProps } from './ReviewForm.props';

import cn from 'classnames';

import styles from './ReviewForm.module.css';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	return (
		<div className={cn(styles.reviewForm, className)} {...props}>
			<Input />
			<Input />
			<div className={styles.rating}>
				<span>Оценка:</span>
				<Rating rating={0} />
			</div>
			<Textarea className={styles.description}/>
			<div className={styles.submit}>
				<Button appearance='primary'>Отправить</Button>
				<span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
			</div>
		</div>
	);
};
