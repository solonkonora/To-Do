import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";

interface TextLogoProps extends ComponentProps<"h1"> {
  //
}

function TextLogo({ className = "", ...restProps }: TextLogoProps) {
  return (
    <Link href="/" className="cursor-pointer w-fit">
      <Image
        src="/logo.svg"
        alt="app logo"
        height={80}
        width={80}
      />
    </Link>
  )
  return (
    <h1
      {...restProps}
      className={cn("font-semibold text-primary-color cursor-pointer text-xl", className)}
    >
      <Link href="/" className="cursor-pointer w-fit">
        R-Devs-To-Do-App
      </Link>
    </h1>
  )
};

export {
  TextLogo,
};
