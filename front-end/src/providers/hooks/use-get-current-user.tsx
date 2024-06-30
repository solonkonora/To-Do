"use client";

import { useEffect, useState } from "react";
// import { useAppContext } from "./context/app-context";
import type { User } from "../context/api/types";
import { getCurrentUser } from "../context/api/context.api";
import { useAppContext } from "../context/app-context";

interface Options {
  /**
   *  weather or not to update the context user when current user is fetched default is false
   */
  updateContextUser?: boolean;
}

const useGetCurrentUser = (options?: Options) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");

  const { setCurrentUser } = useAppContext();

  useEffect(() => {
    getCurrentUser()
      .then(({ data, message, status }) => {
        setUser(data);

        if (options?.updateContextUser) setCurrentUser(data); // also updating the app context;
      })
      .catch((er) => {
        setError(er?.message || "Failed to load user");
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, user };
};

export {
  useGetCurrentUser,
};
