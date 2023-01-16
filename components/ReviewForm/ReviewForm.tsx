import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import { Input, Rating, Textarea, Button } from '../index';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { IReviewForm } from './ReviewForm.interface';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...register('name')}
					placeholder='имя'
				/>
				<Input
					{...register('title')}
					placeholder='Заголовок отзыва'
					className={styles.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name='rating'
						render={({ field }) => (
							<Rating
								isEditable
								setRating={field.onChange}
								rating={field.value}
								ref={field.ref}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description')}
					placeholder='Текст отзыва'
					className={styles.description}
				/>
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			<div className={styles.success}>
				<div className={styles.successTitle}>Ваш отзыв отправлен</div>
				<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
				<CloseIcon className={styles.close} />
			</div>
		</form>
	);
};
