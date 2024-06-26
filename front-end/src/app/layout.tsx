import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { AppContextProvider } from "@/providers/context/app-context";
import { AuthProvider } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/molecules";
import { Toaster } from "sonner";

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
            <Toaster
              closeButton
              theme="light"
              pauseWhenPageIsHidden
              toastOptions={{
                duration: 13000,
                classNames: {
                  // closeButton: "bg-white",
                },
              }}
              className="h-0"
            />

            <>
              <NavBar />

              <div className="w-full min-h-[calc(100vh_-_min(20vh,_90px))] flex items-stretch justify-center">
                {children}
              </div>
            </>
          </AuthProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
