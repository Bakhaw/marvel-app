import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";

import QueryContainer from "./components/QueryContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dark Twitter",
  description: "Social media based on different universe",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/manifest.json" />

        <meta name="theme-color" content="#fff" />
      </Head>
      <body className={inter.className}>
        <QueryContainer>{children}</QueryContainer>
      </body>
    </html>
  );
}
