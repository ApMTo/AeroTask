`use client`;
import React from "react";
import Image from "next/image";
import styles from "./login.module.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <Image src="/logoMobile.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className={styles.title}>Login</h2>
        <input type="email" placeholder="Email" className={styles.input} />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <button className={styles.loginButton}>Sign In</button>{" "}
        <p className={styles.switchText}>
          Don’t have an account?{" "}
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
