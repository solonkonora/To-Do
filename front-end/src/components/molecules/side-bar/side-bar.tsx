"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutDialog } from "../logout-dialog/logout-dialog";

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

  return (
    <div className="w-[40vw] max-w-[300px] min-h-safe-height hidden md:flex flex-col items-center justify-between py-8 bg-primary-color rounded-none">
      <div className="w-full h-fit flex flex-col items-center justify-start gap-6">
        {dashboardElements.map(({ text, href, icon: Icon }) => (
          <Link
            className={cn("w-[90%] flex items-center justify-start gap-4 cursor-pointer text-tertiary-color hover:bg-secondary-color p-2 rounded-sm", pathname === href ? "bg-secondary-color" : "")}
            key={text}
            href={href}
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
        >
          <LogOut />

          <span>Logout</span>
        </button>
      </LogoutDialog>
    </div>
  );
}
