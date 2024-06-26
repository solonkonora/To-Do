import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { AppContextProvider } from "@/providers/context/app-context";
import { AuthProvider } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/molecules";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo-app",
  description: "A full stack todo app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontSans.className, "bg-tertiary-color")}>
        <AppContextProvider>
          <AuthProvider>
            <>
              <NavBar />

              {children}
            </>
          </AuthProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
