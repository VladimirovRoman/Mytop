import Image from 'next/image';
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';

import { Review, Card, Rating, Tag, Button, Divider, ReviewForm } from '../index';

import { declinationOfWords, priceRu } from '../../helpers/helper';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';

export const Product = motion(
	forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
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
			_id,
		} = product;

		const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
		const reviewRef = useRef<HTMLDivElement>(null);

		const scrollToReview = () => {
			setIsReviewOpened(true);
			reviewRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		};

		return (
			<div className={className} {...props} ref={ref}>
				<Card className={styles.product}>
					<div className={styles.logo}>
						<Image src={process.env.NEXT_PUBLIC_DOMAIN + image} alt={title} width={70} height={70} />
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
						<a href='#ref' onClick={scrollToReview}>
							{reviewCount} {declinationOfWords(reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
						</a>
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
					ref={reviewRef}
				>
					{reviews.map((review) => (
						<div key={review._id}>
							<Review review={review}></Review>
							<Divider />
						</div>
					))}
					<ReviewForm productId={_id} />
				</Card>
			</div>
		);
	})
);
