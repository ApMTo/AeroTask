`use client`;

import React, { FC, useEffect, useState } from "react";
import style from "./navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { acme } from "@/app/fonts";

const Navbar: FC = () => {
  const [isResized, setIsResized] = useState<Boolean>(false);
  const [isOpened, setIsOpened] = useState<Boolean>(false);
  const checkWindowWidth = () => {
    const width = window.innerWidth;
    if (width <= 787) {
      setIsResized(true);
    } else {
      setIsResized(false);
    }
  };
  useEffect(() => {
    checkWindowWidth();
  }, []);

  window.addEventListener("resize", checkWindowWidth);
  return (
    <>
      <header className={style.header}>
        <div className={style.logo}>
          {!isResized ? (
            <>
              <Link href="/">
                <Image src="/logoPC.png" width={160} height={10} alt="logo" />
              </Link>
            </>
          ) : (
            <Link href="/" onClick={() => setIsOpened(false)}>
              <Image src="/logoMobile.png" width={80} height={10} alt="logo" />
            </Link>
          )}
        </div>
        <div className={style.navigation}>
          {!isResized ? (
            <>
              <Link href="/tasks" className={acme.className}>
                My Tasks
              </Link>
              <Link href="/login" className={acme.className}>
                Login
              </Link>
              <Link href="/signup" className={acme.className}>
                SignUp
              </Link>
         
            </>
          ) : (
            <>
              <div
                className={`${style.burgerMenu} ${isOpened ? style.open : ""}`}
                onClick={() => setIsOpened(!isOpened)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </>
          )}
        </div>
      </header>
      {isResized ? (
        <>
          <div className={style.burgerMenuWrapper}>
            <div
              className={`${style.burgerMenuBody} ${
                isOpened ? style.active : ""
              }`}
            >
              <nav className={style.navMenu}>
                <Link
                  href="/tasks"
                  onClick={() => setIsOpened(false)}
                  className={`${style.navLink} ${acme.className}`}
                >
                  My Tasks
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpened(false)}
                  className={`${style.navLink} ${acme.className}`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpened(false)}
                  className={`${style.navLink} ${acme.className}`}
                >
                  SignUp
                </Link>
               
              </nav>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
