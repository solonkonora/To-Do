"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "./context/app-context";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAppContext();
  const searchParams = useSearchParams();

  // console.log({ currentUser });

  const router = useRouter();
  const pathname = usePathname();

  if (!currentUser || !currentUser?.username) {

    router.replace("/login?next=" + (searchParams.get("next") || pathname));
    return null;
  }

  return children;
};

export {
  AuthGuard
};
