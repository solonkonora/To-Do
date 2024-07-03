"use client";

import { LoadingPageSkeleton } from "@/components/molecules";
import { useGetCurrentUser } from "./hooks";
import { usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
  /** 
   * If strict is true, user will be navigated to login page if none is found.
   */
  strict?: boolean;
}

function AuthProvider({ children, strict = false }: Props) {
  const { loading, error, user } = useGetCurrentUser({
    updateContextUser: true,
  });

  const router = useRouter();
  const pathname = usePathname();

  if (loading) return (
    <LoadingPageSkeleton>
      Mounting Data...
    </LoadingPageSkeleton>
  );

  if (strict && !user) {
    router.replace("/login?next=" + pathname);

    return (
      <LoadingPageSkeleton>
        Resolving Data...
      </LoadingPageSkeleton>
    )
  }

  return (
    <Suspense>
      {children}
    </Suspense>
  );
};

export {
  AuthProvider
};
