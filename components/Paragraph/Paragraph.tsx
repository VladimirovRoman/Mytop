import { ReactNode } from "react";

import { ParagraphProps } from "./Paragraph.props";
import styles from "./Paragraph.module.css";

export const Paragraph = ({ size = "p16", children }: ParagraphProps): JSX.Element => {
  const getParagraph = (children: ReactNode) => ({
    p14: <p className={styles.p14}>{children}</p>,
    p16: <p className={styles.p16}>{children}</p>,
    p18: <p className={styles.p18}>{children}</p>,
  });

  return getParagraph(children)[size];
};
