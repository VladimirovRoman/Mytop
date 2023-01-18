import { useState, useRef, forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { motion } from 'framer-motion';

import { Rating, Card, Tag, Button, Divider, Review, ReviewForm } from '../index';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';

import { declinationOfWord, priceRu } from '../../helpers/helpers';

export const Product = motion(
	forwardRef(
		(
			{ className, product, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

			const reviewRef = useRef<HTMLDivElement>(null);

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: 'smooth',
				});
				reviewRef.current?.focus();
			};

			const variants = {
				visible: {
					opacity: 1,
					height: 'auto',
				},
				hidden: { opacity: 0, height: 0 },
			};

			return (
				<div className={className} {...props} ref={ref}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<img
								src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
								alt={product.title}
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.title}>{product.title}</div>

						<div className={styles.price}>
							<span>
								<span className='visualyHidden'>цена</span>
								{priceRu(product.price)}
							</span>
							{product.oldPrice && (
								<Tag className={styles.oldPrice} color='green'>
									<span className='visualyHidden'>скидка</span>
									{priceRu(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span className='visualyHidden'>кредит</span>
							{priceRu(product.credit)}/<span className={styles.month}>мес</span>
						</div>

						<div className={styles.rating}>
							<span className='visualyHidden'>
								{'рейтинг' + (product.reviewAvg ?? product.initialRating)}
							</span>
							<Rating rating={product.reviewAvg ?? product.initialRating} />
						</div>

						<div className={styles.tags}>
							{product.categories.map((category) => (
								<Tag key={category} className={styles.category} color='ghost'>
									{category}
								</Tag>
							))}
						</div>

						<div className={styles.priceTitle} aria-hidden={true}>
							цена
						</div>
						<div className={styles.creditTitle} aria-hidden={true}>
							кредит
						</div>
						<div className={styles.rateTitle}>
							<a href='#ref' onClick={scrollToReview}>
								{product.reviewCount}{' '}
								{declinationOfWord(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
							</a>
						</div>
						<Divider className={styles.hr} />
						<div className={styles.description}>{product.description} </div>
						<div className={styles.feature}>
							{product.characteristics.map((characteristic) => (
								<div className={styles.characteristics} key={characteristic.name}>
									<span className={styles.characteristicsName}>{characteristic.name}</span>
									<span className={styles.characteristicsDots}></span>
									<span className={styles.characteristicsValue}>{characteristic.value}</span>
								</div>
							))}
						</div>

						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>Преимущества</div>
									<div>{product.advantages}</div>
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantagesBLock}>
									<div className={styles.advTitle}>Недостатки</div>
									<div>{product.disadvantages}</div>
								</div>
							)}
						</div>

						<Divider className={cn(styles.hr, styles.hr2)} />

						<div className={styles.actions}>
							<Button appearance='primary'>Узнать подробнее</Button>
							<Button
								appearance='ghost'
								arrow={isReviewOpened ? 'down' : 'right'}
								className={styles.reviewButton}
								onClick={() => setIsReviewOpened(!isReviewOpened)}
								aria-expanded={isReviewOpened}
							>
								Читать отзывы
							</Button>
						</div>
					</Card>

					<motion.div
						animate={isReviewOpened ? 'visible' : 'hidden'}
						variants={variants}
						initial='hidden'
					>
						<Card
							color='blue'
							className={styles.reviews}
							ref={reviewRef}
							tabIndex={isReviewOpened ? 0 : -1}
						>
							{product.reviews.map((review) => (
								<div key={review.title}>
									<Review review={review} />
									<Divider />
								</div>
							))}
							<ReviewForm isOpened={isReviewOpened} productId={product.id} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
