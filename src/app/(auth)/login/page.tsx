"use client";
import React, { FormEvent, use, useState } from "react";
import Image from "next/image";
import styles from "./login.module.css";
import Link from "next/link";
import { getUserByEmail } from "@/app/userManager/users";
import { setUserInfoCookie } from "@/app/cookieManager/cookies";
import { useDispatch } from "react-redux";
import { updateUser } from "@/store/slices/users/loggedInUser";
import { useRouter } from "next/navigation";

export default function Page() {
  const [error, setError] = useState<string>("");
  const disptach = useDispatch();
  const router = useRouter();
  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email: string = (e.currentTarget[0] as HTMLInputElement).value;
    const password: string = (e.currentTarget[1] as HTMLInputElement).value;

    const response = await getUserByEmail(email, password);

    if (!response.success) {
      setError(response.message);

      return;
    }
    const user = response.user;

    setError("");

    await setUserInfoCookie(user.id);
    disptach(updateUser(user));
    router.push("/tasks");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.logoContainer}>
          <Image src="/logoMobile.png" alt="Logo" width={100} height={100} />
        </div>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={submitLogin}>
          <input type="email" placeholder="Email" className={styles.input} />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />
          <p className={styles.errorText}>{error}</p>
          <button className={styles.loginButton}>Sign In</button>{" "}
        </form>
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
