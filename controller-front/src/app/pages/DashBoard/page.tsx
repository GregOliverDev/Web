"use client";
import HeaderDash from "@/app/components/compDashboard/HeaderDash/HeaderDash";
import styles from "./page.module.css";
import MainDash from "@/app/components/compDashboard/MainDash/MainDash";

export default function DashBoardPage() {
  return (
    <main className={styles.main}>
      <HeaderDash />
      <MainDash />
    </main>
  );
}
