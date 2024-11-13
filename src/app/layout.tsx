"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers/Providers";
import { getUserInfoCookie } from "./cookieManager/cookies";
import { Provider } from "react-redux";
import store from "@/store/store";
import { Roboto, Acme } from "@next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const acme = Acme({
  weight: ["400"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>AeroTask</title>
        <meta name="description" content="AeroTask" />
      </head>
      <body>
        <Provider store={store}>
          <Providers>{children}</Providers>
        </Provider>
      </body>
    </html>
  );
}
