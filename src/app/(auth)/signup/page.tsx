"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./signup.module.css";
import { FormEvent } from "react";
import { setUserInfoCookie } from "@/app/cookieManager/cookies";
import { createNewUser } from "../../userManager/users";
export default function Page() {
  const createAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email: string = (e.currentTarget[0] as HTMLInputElement).value;
    const username: string = (e.currentTarget[1] as HTMLInputElement).value;
    const password: string = (e.currentTarget[2] as HTMLInputElement).value;
    const confirmPassword: string = (e.currentTarget[3] as HTMLInputElement)
      .value;

    const newUser = {
      id: new Date().getTime().toString(),
      email,
      username,
      password,
    };

    await setUserInfoCookie(newUser.id);
    await createNewUser(newUser);
    document.location.reload();
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.signupLogoContainer}>
          <Image src="/logoMobile.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className={styles.signupTitle}>Sign Up</h2>

        <form onSubmit={createAccount}>
          <input
            type="text"
            placeholder="Email"
            className={styles.signupInput}
          />
          <input
            type="text"
            placeholder="Username"
            className={styles.signupInput}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.signupInput}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.signupInput}
          />
          <button className={styles.signupButton}>Create Account</button>
        </form>
        <p className={styles.signupSwitchText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.signupLink}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
