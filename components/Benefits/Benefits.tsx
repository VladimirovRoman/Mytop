import { BenefitsProps } from "./Benefits.props";
import styles from "./Benefits.module.css";
import GreenMark from "./green_mark.svg";

export const Benefits = ({ advantages }: BenefitsProps): JSX.Element => {
  return (
    <div>
      {advantages.map((advantage) => (
        <section key={advantage.title} className={styles.advantage}>
          <GreenMark />
          <div className={styles.title}>{advantage.title}</div>
          <hr className={styles.line} />
          <div>{advantage.description}</div>
        </section>
      ))}
    </div>
  );
};
