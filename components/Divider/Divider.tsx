import { ReactNode } from "react";
import cn from "classnames";

import { DividerProps } from "./Divider.props";
import styles from "./Divider.module.css";

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
