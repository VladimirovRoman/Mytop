import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import cn from 'classnames';

import { Input, Rating, Textarea, Button } from '../index';

import { ReviewFormProps } from './ReviewForm.props';
import { API } from '../../helpers/api';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';

import CloseIcon from './close.svg';
import styles from './ReviewForm.module.css';

export const ReviewForm = ({
	productId,
	isOpened,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();

	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setError] = useState<string>();

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
				setError('Что-то пошло не так');
			}
		} catch (error) {
			if (error instanceof Error) setError(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', { required: { value: true, message: 'Заполните имя' } })}
					placeholder='Имя'
					error={errors.name}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.name ? true : false}
				/>
				<Input
					{...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
					placeholder='Заголовок отзыва'
					className={styles.title}
					error={errors.title}
					tabIndex={isOpened ? 0 : -1}
					aria-invalid={errors.title ? true : false}
				/>
				<div className={styles.rating}>
					<span>Оценка</span>
					<Controller
						control={control}
						name='rating'
						rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
						render={({ field }) => (
							<Rating
								isEditable
								rating={field.value}
								ref={field.ref}
								setRating={field.onChange}
								error={errors.rating}
								tabIndex={isOpened ? 0 : -1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', { required: { value: true, message: 'Заполните описание' } })}
					placeholder='Текст отзыва'
					className={styles.description}
					error={errors.description}
					tabIndex={isOpened ? 0 : -1}
					aria-label='текст отзыва'
					aria-invalid={errors.description ? true : false}
				/>
				<div className={styles.submit}>
					<Button tabIndex={isOpened ? 0 : -1} appearance='primary' onClick={() => clearErrors()}>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и проверку
					</span>
				</div>
			</div>
			{isSuccess && (
				<div className={cn(styles.success, styles.panel)} role='alert'>
					<div className={styles.successTitle}>Ваш отзыв отправлен</div>
					<div> Спасибо, ваш отзыв будет опубликован после проверки.</div>
					<button
						area-label='закрыть оповещение'
						onClick={() => setIsSuccess(false)}
						className={styles.close}
					>
						<CloseIcon />
					</button>
				</div>
			)}
			{isError && (
				<div className={cn(styles.error, styles.panel)} role='alert'>
					Что-то пошло не так, попробуйте обновить страницу
					<button
						area-label='закрыть оповещение'
						onClick={() => setError(undefined)}
						className={styles.close}
					>
						<CloseIcon />
					</button>
				</div>
			)}
		</form>
	);
};
