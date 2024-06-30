"use client";

import { LoadingPageSkeleton } from "@/components/molecules";
import { useGetCurrentUser } from "./hooks";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loading, error, user } = useGetCurrentUser({
    updateContextUser: true,
  });

  return loading ? (
    <LoadingPageSkeleton>
      Mounting Data...
    </LoadingPageSkeleton>
  ) : children;
};

export {
  AuthProvider
};
