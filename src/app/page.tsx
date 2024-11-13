"use client";
import Link from "next/link";
import styles from "./homePage.module.css";
export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>AeroTask</span>
        </h1>
        <p className={styles.subtitle}>
          Your ultimate tool for managing tasks effectively
        </p>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is AeroTask?</h2>
          <p className={styles.text}>
            <span className={styles.highlight}>AeroTask</span> helps you create,
            prioritize, and manage your tasks efficiently. With AeroTask, you
            can easily track your tasks, set priorities, and update them when
            needed.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Choose AeroTask?</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Simplicity: A clean, intuitive interface.
            </li>
            <li className={styles.listItem}>
              Flexibility: Easily set priorities and statuses.
            </li>
            <li className={styles.listItem}>
              Control: Edit or update your tasks anytime.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Get Started</h2>
          <p className={styles.text}>
            Ready to take control of your tasks? Start using AeroTask today and
            experience ultimate productivity.
          </p>
          <Link href="/signup" className={styles.ctaButton}>
            Sign Up Now
          </Link>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              Task Creation: Create tasks in a few clicks.
            </li>
            <li className={styles.listItem}>
              Priority Management: Set task priority easily.
            </li>
            <li className={styles.listItem}>
              Real-time Updates: Get instant notifications.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
