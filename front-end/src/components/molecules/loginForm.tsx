"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

type Props = {};

export default function LoginForm({}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("jsdjk")
  };

  return (
    <div className="border w-1/2 flex justify-between mx-auto rounded text-primary-color py-8 border-secondary-color mt-20">
      <div className="w-full">
        <div className="w-full flex justify-between gap-5 mx-auto  p-5 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="password"
              id="email"
              placeholder="password"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="password"
              id="email"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <p className="text-center py-5">
          Already have an account?{" "}
          <span className="hover:underline font-semibold">Signup</span>
        </p>
        <Button
          className="bg-primary-color flex justify-center mx-auto text-[#f1f1f1] px-8"
          onClick={handleLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
