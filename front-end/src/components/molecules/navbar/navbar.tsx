"use client"

import React from "react";
import { TextLogo } from "../../ui/text-logo";
import { useAppContext } from "@/providers/context/app-context";
import Link from "next/link";
import { CircleUser, User, UserRoundX, UserX } from "lucide-react";

export default function Navbar() {
  const { currentUser } = useAppContext();

  return (
    <nav className="w-full h-[min(20vh,_90px)] px-6 py-5 bg-secondary-color flex items-center justify-between">
      <TextLogo />

      <span
        // href={currentUser?.username ? "/todos" : "/login"}
        className="w-fit flex flex-col sm:flex-row items-center justify-center gap-2 text-primary-color hover:cursor-pointer"
      >
        <CircleUser size={40} />

        <span className="font-semibold text-nowrap">
          {currentUser?.username || "Login"}
        </span>
      </span>
    </nav>
  );
}
