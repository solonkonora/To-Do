"use client";

import { useAppContext } from "@/providers/context/app-context";
import Link from "next/link";

function GetStartedCTA() {
  const { currentUser } = useAppContext();

  return (
    <Link
      href={currentUser ? "/todos" : "/login"}
      className="bg-primary-color text-white px-16 py-2 rounded-md mt-6"
    >
      Get Started
    </Link>
  );
}

export { GetStartedCTA };
