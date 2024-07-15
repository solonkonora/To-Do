"use client";

import { tokenService } from "@/lib/token-service";
import { useAppContext } from "@/providers/context/app-context";
import { LayoutGrid, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

interface NavButtonProps extends ComponentProps<"a"> {
  //
}

function NavButton({ className = "", href = "", ...restProps }: NavButtonProps) {
  return (
    <Link
      {...restProps}
      href={href}
      className={cn("w-[90%] flex items-center justify-start gap-4 cursor-pointer text-tertiary-color hover:bg-secondary-color p-2 hover:rounded-sm", className)}
    />
  )
}

export default function Sidebar() {
  const { setCurrentUser } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    tokenService.removeToken();

    //set the current user to null
    setCurrentUser(null);

    router.replace("/");
    toast.success("Logout successful!");
  };

  return (
    <div className="w-[40vw] max-w-[300px] hidden md:flex flex-col items-center justify-start gap-6 pt-8 bg-primary-color rounded-none">
      {dashboardElements.map(({ text, href, icon: Icon }) => (
        <Link
          className="w-[90%] flex items-center justify-start gap-4 cursor-pointer text-tertiary-color hover:bg-secondary-color p-2 hover:rounded-sm"
          key={text}
          href={href}
        >
          <Icon />

          <span>{text}</span>
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className="w-[90%] flex items-center justify-start gap-2 mt-[36rem] cursor-pointer hover:bg-secondary-color p-2 hover:rounded-sm"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[40px] h-[35px] rounded-sm">
            <LogOut className="text-tertiary-color" />
          </div>
        </div>
        <div className="w-[90%] h-[35px] rounded-sm text-tertiary-color">
          <span>Logout</span>
        </div>
      </button>
    </div>
  );
}
