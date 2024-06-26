"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { login, signUp } from "./api";
import { tokenService } from "@/lib/token-service";
import { useRouter } from "next/navigation";

interface Props {
  pageType: "Login" | "Sign Up" // re-using same form for both pages
}

export default function LoginOrSignUpPage({ pageType }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLoginOrSignUp = async () => {
    if (!username || !password) {
      return toast.warning("Username and Password fields required");
    };

    const userData = {
      username,
      password,
    };

    if (pageType === "Login") {
      console.log("logging in")
      toast.promise(
        () => login(userData), {
        loading: "Loading...",
        success: (res) => {
          const { data: token, status, message } = res;
          tokenService.saveToken(token);

          router.push("/todos");

          return message;
        },
        error: (er) => {
          if (er?.message) return er?.message;

          return "Invalid username or password"
        }
      });
      return;
    };
    // SIGN UP

    console.log("signing up")
    toast.promise(
      () => signUp(userData), {
      loading: "Loading...",
      success: (res) => {
        const { data: token, status, message } = res;
        tokenService.saveToken(token);

        router.push("/todos");

        return message;
      },
      error: (er) => {
        if (er?.message) return er?.message;

        return "Invalid username or password"
      }
    })
  };

  return (
    <main className="w-full flex items-center justify-center">
      <div className="border w-[90%] max-w-[500px] flex flex-col justify-between mx-auto rounded text-primary-color py-8 border-secondary-color mt-20">
        <div className="w-full flex justify-between gap-5 mx-auto p-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <p className="text-center py-5">
          {pageType === "Login" ? "Don't have an account?" : "Already have an account"} {" "}
          <Link href={pageType === "Login" ? "/signup" : "/login"} className="hover:underline font-semibold">
            {pageType === "Login" ? "SignUp" : "Login"}
          </Link>
        </p>

        <Button
          className="bg-primary-color flex justify-center mx-auto text-[#f1f1f1] px-8"
          onClick={handleLoginOrSignUp}
        >
          {pageType}
        </Button>
      </div>
    </main>
  );
}
