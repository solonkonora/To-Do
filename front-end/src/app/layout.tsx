import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import UserAuthGuardProvider from "@/components/user-auth-guard/user-auth-guard";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo-app",
  description: "A full stack todo app",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <UserAuthGuardProvider> {children} </UserAuthGuardProvider>
      </body>
    </html>
  );
}
