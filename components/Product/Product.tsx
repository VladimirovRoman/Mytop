import { useState } from "react";
import Image from "next/image";
import cn from "classnames";

import { Rating, Card, Tag, Button, Divider, Review, ReviewForm } from "../index";
import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { declinationOfWords, priceRu } from "../../helpers/helper";



export const Product = ({ className, product, ...props }: ProductProps): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image src={process.env.NEXT_PUBLIC_DOMAIN + product.image} alt={product.title} width={70} height={70} />
				</div>
				<div className={styles.title}>{product.title}</div>

				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPrice} color='green'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>

				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.mounth}>мес</span>
				</div>

				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>

				<div className={styles.tags}>
					{product.categories.map((category) => (
						<Tag key={category} className={styles.category} color='ghost'>
							{category}
						</Tag>
					))}
				</div>

				<div className={styles.priceTitle}>цена</div>
				<div className={styles.creditTitle}>кредит</div>
				<div className={styles.rateTitle}>
					{product.reviewCount} {declinationOfWords(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
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
				{product.reviews.map((review) => (
					<div key={review.title}>
						<Review review={review} />
						<Divider />
					</div>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</>
	);
};
