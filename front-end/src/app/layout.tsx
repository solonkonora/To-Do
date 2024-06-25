import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserAuthGuardProvider from "@/components/user-auth-guard/user-auth-guard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO",
  description: "Todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserAuthGuardProvider> {children} </UserAuthGuardProvider>
      </body>
    </html>
  );
}
