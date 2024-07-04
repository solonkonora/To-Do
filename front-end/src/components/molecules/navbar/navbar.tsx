"use client";

import { useMemo } from "react";
import { TextLogo } from "../../ui/text-logo";
import { useAppContext } from "@/providers/context/app-context";
import Link from "next/link";
import { CircleUser, User, UserRoundX, UserX } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { currentUser } = useAppContext();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = useMemo(() => {
    if (!currentUser) return "/login";

    return `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
  }, [currentUser]);

  return (
    <nav className="w-full h-[min(20vh,_90px)] px-6 py-5 bg-secondary-color flex items-center justify-between">
      <TextLogo />

      <Link
        href={href}
        className="w-fit flex flex-col sm:flex-row items-center justify-center gap-2 text-primary-color hover:cursor-pointer"
      >
        <CircleUser size={40} />

        <span className="font-semibold text-nowrap">
          {currentUser?.username || "Login"}
        </span>
      </Link>
    </nav>
  );
}
