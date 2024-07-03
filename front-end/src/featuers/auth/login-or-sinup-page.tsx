"use client";

import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { login, signUp } from "./api";
import { tokenService } from "@/lib/token-service";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageType: "Login" | "Sign Up" // re-using same form for both pages
}

export default function LoginOrSignUpPage({ pageType }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const nextPath = useMemo(() => searchParams.get("next") || "", [searchParams]);

  const handleLoginOrSignUp = async () => {
    // router.push(nextPath);

    // return;
    if (!username || !password) {
      return toast.warning("Username and Password fields required");
    };

    setLoading(true);

    const userData = {
      username,
      password,
    };

    if (pageType === "Login") {
      toast.promise(
        () => login(userData), {
        loading: "Loading...",
        success: (res) => {
          const { data: token, status, message } = res;
          tokenService.saveToken(token);

          if (nextPath) router.push(nextPath);
          else router.push("/todos");

          return message;
        },
        error: (er) => {
          return er?.message || "Invalid username or password";
        },
        finally: () => setLoading(false),
      });
      return;
    };
    // SIGN UP

    toast.promise(
      () => signUp(userData), {
      loading: "Loading...",
      success: (res) => {
        const { data: token, status, message } = res;
        tokenService.saveToken(token);

        if (nextPath) router.push(nextPath);
        else router.push("/todos");

        return message;
      },
      error: (er) => {
        return er?.message || "Invalid username or password";
      },
      finally: () => setLoading(false),
    })
  };

  return (
    <main className="w-full flex items-center justify-center">
      <div className="border w-[90%] max-w-[500px] md:max-w-[620px] flex flex-col items-center justify-between rounded text-primary-color py-8 border-secondary-color">
        <div className="w-full flex flex-col md:flex-row justify-between gap-5 mx-auto p-5">
          <div className="w-full flex flex-col items-start justify-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter Username"
              disabled={loading}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col items-start justify-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter Password"
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <p className="w-fit py-5">
          {pageType === "Login" ? "Don't have an account?" : "Already have an account"} {" "}
          <Link href={pageType === "Login" ? "/signup" : "/login"} className="hover:underline font-semibold">
            {pageType === "Login" ? "SignUp" : "Login"}
          </Link>
        </p>

        <Button
          className="bg-primary-color w-full max-w-[min(90%,_170px)] flex justify-center text-tertiary-color px-8"
          disabled={loading}
          onClick={handleLoginOrSignUp}
        >
          {pageType}
        </Button>
      </div>
    </main>
  );
}
