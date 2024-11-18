"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./signup.module.css";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { setUserInfoCookie } from "@/app/cookieManager/cookies";
import {
  checkUserByEmail,
  checkUserByUsername,
  createNewUser,
  getUserByEmail,
} from "../../userManager/users";
import debounce from "just-debounce-it";
import { setError } from "@/utils/setError";
import { clearError } from "@/utils/clearError";
import { log } from "console";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateUser } from "@/store/slices/users/loggedInUser";
export default function Page() {
  interface ErrorExample {
    status: boolean;
    title: string;
    message: string;
  }
  const dispatch = useDispatch();
  const router = useRouter();
  const [emailError, setEmailError] = useState<ErrorExample | null>(null);
  const [userNameError, setUserNameError] = useState<ErrorExample | null>(null);
  const [userPasswordError, setUserPasswordError] =
    useState<ErrorExample | null>(null);

  const setEmailErrorMemo = useMemo(() => setEmailError, []);
  const setUserNameErrorMemo = useMemo(() => setUserNameError, []);
  const setUserPasswordErrorMemo = useMemo(() => setUserPasswordError, []);

  const debouncedSearch = debounce(
    async (e: ChangeEvent<HTMLInputElement>, title: string) => {
      console.log(title);

      const text = e.target.value.trim();

      let responseEx;
      const setState =
        title === "Email" ? setEmailErrorMemo : setUserNameErrorMemo;

      if (title === "Email") {
        responseEx = await checkUserByEmail(text);
      } else if (title === "Username") {
        responseEx = await checkUserByUsername(text);
      }

      if (!responseEx.success) {
        setError(setState, false, title, responseEx.message);
        return;
      }

      clearError(setState);
    },
    500
  );
  const createAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailError?.status === false || !userNameError?.status === false)
      return;

    const email: string = (e.currentTarget[0] as HTMLInputElement).value;
    const username: string = (e.currentTarget[1] as HTMLInputElement).value;
    const password: string = (e.currentTarget[2] as HTMLInputElement).value;
    const confirmPassword: string = (e.currentTarget[3] as HTMLInputElement)
      .value;

    if (password !== confirmPassword) {
      setError(
        setUserPasswordErrorMemo,
        false,
        "Password",
        "The passwords do not match."
      );

      return;
    }

    const newUser = {
      id: new Date().getTime().toString(),
      email,
      username,
      password,
    };

    await setUserInfoCookie(newUser.id);
    await createNewUser(newUser);
    clearError(setUserPasswordErrorMemo);
    dispatch(updateUser(newUser));
    router.push("/tasks");
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
            onChange={(e) => debouncedSearch(e, "Email")}
            required
          />
          {emailError?.title === "Email" ? <p className={styles.error}>{emailError.message}</p> : ""}
          <input
            type="text"
            placeholder="Username"
            className={styles.signupInput}
            onChange={(e) => debouncedSearch(e, "Username")}
            required
          />
          {userNameError?.title === "Username" ? (
            <p className={styles.error}>{userNameError.message}</p>
          ) : (
            ""
          )}

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
          {userPasswordError?.title === "Password" ? (
            <p className={styles.error}>{userPasswordError.message}</p>
          ) : (
            ""
          )}
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
