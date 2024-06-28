"use client";
import styles from "./MessageTheme.module.css";

type Props = {
    title: string;
    message: string;
    type: string;
}

export default function MessageTheme({title, message, type}: Props) {
  if(type === "Error"){
    return (
      <div className={styles.divMessage}>
        <h3 className={styles.textTitle}>{title}</h3>
        <p className={styles.messageError}>{message}</p>
      </div>
    );
  }else if(type === "Sucess"){
    return (
      <div className={styles.divMessageSucess}>
        <h3 className={styles.textTitleSucess}>{title}</h3>
        <p className={styles.messageSucess}>{message}</p>
      </div>
    );
  }
}
