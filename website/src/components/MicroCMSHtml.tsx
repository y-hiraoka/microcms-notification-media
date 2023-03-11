import { FC } from "react";
import styles from "./MicroCMSHtml.module.css";

export const MicroCMSHtml: FC<{ html: string }> = ({ html }) => {
  return (
    <div
      className={styles.contents}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
