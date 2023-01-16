import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import { Input, Rating, Textarea, Button } from '../index';

import CloseIcon from './close.svg';
import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useState } from 'react';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IReviewForm>();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
				...formData,
				productId,
			});

			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setIsError('Что-то пошло не так');
			}
		} catch (error) {
			if (error instanceof Error) {
				setIsError(error.message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div
				className={cn(styles.reviewForm, className)}
				{...props}
			>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='имя'
					error={errors.name}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					placeholder='Заголовок отзыва'
					className={styles.title}
					error={errors.title}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						rules={{ required: { value: true, message: 'Укажите  рейтинг' } }}
						name='rating'
						render={({ field }) => (
							<Rating
								isEditable
								error={errors.rating}
								setRating={field.onChange}
								rating={field.value}
								ref={field.ref}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', { required: { value: true, message: 'Заполните описание' } })}
					placeholder='Текст отзыва'
					className={styles.description}
					error={errors.description}
				/>
				<div className={styles.submit}>
					<Button appearance='primary'>Отправить</Button>
					<span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)}>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div>Спасибо, ваш отзыв будет опубликован после проверки</div>
					<CloseIcon
						className={styles.close}
						onClick={() => setIsSuccess(false)}
					/>
				</div>
			)}
			{isError && (
				<div className={cn(styles.error, styles.panel)}>
					Что-то пошло не так, попробуйте обновить страницу
					<CloseIcon
						className={styles.close}
						onClick={() => setIsError(undefined)}
					/>
				</div>
			)}
		</form>
	);
};
