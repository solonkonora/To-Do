"use client";

import { useMemo } from "react";
import { Logo } from "../../ui/logo";
import { useAppContext } from "@/providers/context/app-context";
import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { currentUser, setOpenNav } = useAppContext();

  const pathname = usePathname();

  const href = useMemo(() => {
    if (!currentUser) return "/login";

    return "/todos";
  }, [currentUser]);

  return (
    <nav className="w-full h-nav-height px-6 py-5 bg-secondary-color flex items-center justify-between">
      <Logo
        className={cn(pathname.includes("/todos") ? "hidden md:flex" : "flex")}
      />

      <Menu
        size={27}
        className={cn(
          pathname.includes("/todos")
            ? "md:hidden text-primary-color"
            : "hidden"
        )}
        onClick={() => setOpenNav(true)}
      />

      <Link
        href={href}
        className="w-fit flex flex-col sm:flex-row items-center justify-center gap-2 text-primary-color hover:cursor-pointer"
      >
        <CircleUser className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]" />

        <span className="font-semibold text-nowrap">
          {currentUser?.username || "Login"}
        </span>
      </Link>
    </nav>
  );
}
