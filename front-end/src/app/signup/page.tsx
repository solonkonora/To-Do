import LoginForm from "@/components/molecules/loginForm";
import Navbar from "@/components/molecules/navbar";
import React from "react";

type Props = {};

export default function Hone({}: Props) {
  return (
    <div>
      <Navbar />
      <LoginForm />
    </div>
  );
}
