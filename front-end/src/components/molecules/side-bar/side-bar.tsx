"use client"

import { tokenService } from "@/lib/token-service";
import { useAppContext } from "@/providers/context/app-context";
import { LayoutGrid, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const dashboardElements = [
  {
    text: "Todos",
    icon: <LayoutGrid className=" text-tertiary-color" />,
    href: "/todos",
  },
  {
    text: "Add Task",
    icon: <Plus className="text-tertiary-color" />,
    href: "/todos/add-new",
  },
];

export default function Sidebar() {
  const {setCurrentUser} = useAppContext()
  const router = useRouter();

  const handleLogout = () => {
    tokenService.removeToken()

    //set the current user to null
    setCurrentUser(null);

    router.replace("/");
    toast.success("Logout successful!");
  };

  return (
    <div className="w-[40vw] max-w-[300px] hidden md:flex flex-col items-center justify-start gap-6 pt-8 bg-primary-color rounded-none">
      {dashboardElements.map((textIcon) => (
        <Link
          className="w-[90%] flex items-center justify-start gap-4 cursor-pointer hover:bg-secondary-color p-2 hover:rounded-sm"
          key={textIcon.href}
          href={textIcon.href}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-[40px] h-[35px] rounded-sm">
              <span>{textIcon.icon}</span>
            </div>
          </div>
          <div className="w-[90%] h-[35px] rounded-sm text-tertiary-color">
            <span>{textIcon.text}</span>
          </div>
        </Link>
      ))}

      <button onClick={handleLogout} className="w-[90%] flex items-center justify-start gap-2 mt-[36rem] cursor-pointer hover:bg-secondary-color p-2 hover:rounded-sm" >
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
