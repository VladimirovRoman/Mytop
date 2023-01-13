import { AdvantagesProps } from './Advantages.props';
import CheckIcon from './check.svg';

import styles from './Advantages.module.css';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<div>
			{advantages.map((a) => (
				<div key={a._id} className={styles.advantage}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
						<hr className={styles.line} />
						<div>{a.description}</div>
				</div>
			))} 
		</div>
	);
};
