"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Socials",
  description: "Social media based on Marvel universe",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
