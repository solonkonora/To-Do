"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "./context/app-context";
import { getCurrentUser } from "./context/api/context.api";
import { LoadingPageSkeleton } from "@/components/molecules";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const { setCurrentUser } = useAppContext();

  useEffect(() => {
    getCurrentUser()
      .then(({ data, message, status }) => {
        setCurrentUser(data);
      })
      .catch((er) => er)
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingPageSkeleton>
      {/* Starting App */}
    </LoadingPageSkeleton>
  ) : children;
};

export {
  AuthProvider
};
