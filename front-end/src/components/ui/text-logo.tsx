import { cn } from "@/lib/utils";
import Link from "next/link";
import { type ComponentProps } from "react";

interface TextLogoProps extends ComponentProps<"h1"> {
  //
}

function TextLogo({ className = "", ...restProps }: TextLogoProps) {
  return (
    <h1
      {...restProps}
      className={cn("font-semibold text-primary-color cursor-pointer", className)}
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
