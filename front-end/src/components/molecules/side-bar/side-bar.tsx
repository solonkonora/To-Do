"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, LogOut, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutDialog } from "../logout-dialog/logout-dialog";
import { useAppContext } from "@/providers/context/app-context";
import { Logo } from "@/components/ui/logo";

const dashboardElements = [
  {
    text: "Todos",
    icon: LayoutGrid,
    href: "/todos",
  },
  {
    text: "Add Task",
    icon: Plus,
    href: "/todos/add-new",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { openNav, setOpenNav } = useAppContext();

  const closeSideBar = () => {
    setOpenNav(false);
  };

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full z-20",
          openNav ? "block md:hidden" : "hidden"
        )} // acting as overlay
        style={{
          background: "linear-gradient(to bottom, #006D776f, #0000006f)",
        }}
        onClick={closeSideBar}
      />

      <div
        className={cn(
          "fixed top-0 left-0 z-30 md:static w-[70vw] md:w-[40vw] max-w-[300px] duration-300 md:duration-0 min-h-screen md:min-h-safe-height flex flex-col items-center justify-between py-8 bg-primary-color rounded-none",
          openNav ? "translate-x-0" : "translate-x-[-110%] md:translate-x-0"
        )}
      >
        <div className="w-full h-fit flex flex-col items-center justify-start gap-6">
          <span className="w-[90%] flex items-center justify-between md:hidden">
            <Logo className="shadow" />

            <X
              size={27}
              className="text-tertiary-color border rounded-sm"
              onClick={closeSideBar}
            />
          </span>

          {dashboardElements.map(({ text, href, icon: Icon }) => (
            <Link
              className={cn(
                "w-[90%] flex items-center justify-start gap-4 cursor-pointer text-tertiary-color hover:bg-secondary-color p-2 rounded-sm",
                pathname === href ? "bg-secondary-color" : ""
              )}
              key={text}
              href={href}
              onClick={closeSideBar}
            >
              <Icon />

              <span>{text}</span>
            </Link>
          ))}
        </div>

        <LogoutDialog>
          <button
            type="button"
            className="w-[90%] flex items-center justify-start gap-4 cursor-pointer text-tertiary-color hover:bg-secondary-color p-2 hover:rounded-sm"
            onClick={closeSideBar}
          >
            <LogOut />

            <span>Logout</span>
          </button>
        </LogoutDialog>
      </div>
    </>
  );
}
