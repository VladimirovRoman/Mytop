import Image from 'next/image';
import { useState } from 'react';
import cn from 'classnames';

import { Review, Card, Rating, Tag, Button, Divider } from '../index';

import { declinationOfWords, priceRu } from '../../helpers/helper';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
	const {
		image,
		categories,
		title,
		price,
		oldPrice,
		credit,
		description,
		reviewAvg,
		initialRating,
		reviewCount,
		advantages,
		disadvantages,
		characteristics,
		reviews,
	} = product;

	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image src={process.env.NEXT_PUBLIC_DOMAIN + image} alt={title} width={70} height={70} />
					<img />
				</div>
				<div className={styles.title}>{title}</div>
				<div className={styles.price}>
					{priceRu(price)}
					{oldPrice && (
						<Tag className={styles.oldPrice} color='green'>
							{priceRu(price - oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={reviewAvg ?? initialRating} />
				</div>
				<div className={styles.tags}>
					{categories.map((category) => (
						<Tag className={styles.category} color='ghost' key={category}>
							{category}
						</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}>
					{reviewCount} {declinationOfWords(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.description}>{description}</div>
				<div className={styles.feature}>
					{characteristics.map((characteristic) => (
						<div className={styles.characteristics} key={characteristic.name}>
							<span className={styles.characteristicsName}>{characteristic.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{characteristic.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{advantages && (
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							<div>{advantages}</div>
						</div>
					)}
					{disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							<div>{disadvantages}</div>
						</div>
					)}
				</div>
				<Divider className={cn(styles.hr, styles.h2)} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						className={styles.reviewButton}
						appearance='ghost'
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card
				color='blue'
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
			>
				{reviews.map((review) => (
					<Review key={review._id} review={review}></Review>
				))}
			</Card>
		</>
	);
};
