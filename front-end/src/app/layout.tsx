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

const appDescription =
  "Rebase Devs todo app. This app is the outcome of a collaboration, and a learning experience for the team, where we collaborated with, and outsourced one another";

const siteName = "R - Devs - Todo-app";

export const metadata: Metadata = {
  title: {
    template: "%s | R - Devs",
    default: siteName,
  },
  description: appDescription,
  keywords: [
    "todo",
    "todo app",
    "r-devs",
    "rebase devs",
    "rebase",
    "rebase academy",
    "rebase code camp",
    "SEO",
  ],
  // manifest: "/manifest.json",
  authors: [
    {
      url: "https://github.com/RashJrEdmund",
      name: "Rash Edmund",
    },
    {
      url: "https://github.com/EwiJosepha",
      name: "EwiJosepha",
    },
  ],
  openGraph: {
    type: "website",
    description: appDescription,
    siteName,
    title: {
      template: "%s | R - Devs",
      default: "R - Devs - Todo-app",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
    // startupImage: []
  },
  twitter: {
    card: "summary",
    creator: "orashus",
    description: appDescription,
    title: {
      template: "%s | R - Devs",
      default: "R - Devs - Todo-app",
    },
  },
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
                // duration: 1300,
                classNames: {
                  // closeButton: "bg-white",
                },
              }}
              className="h-0"
            />

            <>
              <NavBar />

              <div className="w-full min-h-safe-height flex items-stretch justify-center">
                {children}
              </div>
            </>
          </AuthProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
