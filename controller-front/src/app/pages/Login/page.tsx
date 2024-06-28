"use client";
import MainLogin from "@/app/components/compLogin/MainLogin/MainLogin";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.main}>
      <MainLogin />
    </main>
  );
}
