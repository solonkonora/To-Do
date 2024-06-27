import { LayoutGrid, LogOut, Plus } from "lucide-react";
import Link from "next/link";

const dashboardElements = [
  {
    text: "Todos",
    icon: <LayoutGrid className=" text-tertiary-color" />,
    href: "/todos"
  },
  {
    text: "Add Task",
    icon: <Plus className="text-tertiary-color" />,
    href: "/todos/add-new"
  },
];

export default function Sidebar() {
  return (
    <div
      className="w-[40vw] max-w-[300px] flex flex-col items-center justify-start gap-6 pt-8 bg-primary-color rounded-none"
    >
      {dashboardElements.map((textIcon) => (
        <Link className="w-[90%] flex items-center justify-start gap-4 cursor-pointer" key={textIcon.href} href={textIcon.href}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-[40px] h-[35px] rounded-sm">
              <span>{textIcon.icon}</span>
            </div>
          </div>
          <div className="w-[90%] h-[35px] rounded-sm text-tertiary-color hover:text-blue-950">
            <span>{textIcon.text}</span>
          </div>
        </Link>
      ))}
      <Link href="/logout" className="w-[90%] flex items-center justify-start gap-4 mt-80 cursor-pointer" >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[40px] h-[35px] rounded-sm">
            <LogOut className="text-tertiary-color" />
          </div>
        </div>
        <div className="w-[90%] h-[35px] rounded-sm text-tertiary-color hover:text-blue-950">
          <span>Logout</span>
        </div>
      </Link>
    </div>
  );
}