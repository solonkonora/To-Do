"use client"

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { TextLogo } from "../ui/text-logo";
import { useAppContext } from "@/providers/context/app-context";

export default function Navbar() {
  const { currentUser } = useAppContext();

  console.log({ currentUser })

  return (
    <nav className="w-full h-[min(20vh,_90px)] px-6 py-5 bg-secondary-color flex items-center justify-between">
      <TextLogo className="text-xl" />

      <div className="w-fit flex items-center justify-center gap-2 text-primary-color hover:cursor-pointer">
        <FaUserCircle size={40} />

        <span className="font-semibold">
          {currentUser?.username || "Login"}
        </span>
      </div>
    </nav>
  );
}
