import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { CookiesProvider } from "next-client-cookies/server";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LIS",
  description: "The number 1 app that will automatically backup images, videos, and other files sent via LINE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <CookiesProvider>{children}</CookiesProvider>
      <Toaster />
      </body>
    </html>
  );
}
