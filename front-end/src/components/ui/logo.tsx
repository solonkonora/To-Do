import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps } from "react";

interface LogoProps extends ComponentProps<"h1"> {
  //
}

function Logo({ className = "", ...restProps }: LogoProps) {
  return (
    <Link href="/" className={cn("cursor-pointer w-fit", className)}>
      <Image
        src="/logo.svg"
        alt="app logo"
        height={80}
        width={80}
        className="w-[50px] md:w-[70px]"
      />
    </Link>
  );
}

export { Logo };
