import { useEffect, useState } from 'react';
import { RatingProps } from './Rating.props';
import cn from 'classnames';

import styles from './Rating.module.css';
import StarIcon from './star.svg';

export const Rating = ({ isEditable = false, rating, ...props }: RatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
	
	useEffect(() => {
		constructRating(rating);
	}, [rating]);

	const constructRating = (currentRating: number) => {
		const updateArray = ratingArray.map((rating: JSX.Element, index: number) => {
			return (
				<StarIcon
					className={cn(styles.star, {
						[styles.filled]: index < currentRating,
					})}
				/>
			);
		});
		setRatingArray(updateArray);
	};

	return (
		<div {...props}>
			{ratingArray.map((rating, index) => (
				<span key={index}>{rating}</span>
			))}
		</div>
	);
};
