"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TextLogo } from "@/components/ui/text-logo";
import { usePathname } from "next/navigation";

export default function LoadingPageSkeleton({ children = null }: { children?: React.ReactNode }) {
  const pathName = usePathname();

  return (
    <main className="fixed z-20 w-full min-h-screen flex flex-col items-start justify-start">
      <Skeleton // acting as top bar
        className="w-full h-[min(20vh,_90px)] flex items-center justify-between p-8 bg-secondary-color rounded-none"
      >
        <TextLogo />

        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
          <Skeleton className="w-[50px] h-[20px]" />
        </div>
      </Skeleton>

      {
        pathName.includes("todos") ? (
          <div className="w-full min-h-[calc(100vh_-_min(20vh,_90px))] hidden md:flex items-stretch justify-start">
            <Skeleton // acting as sidebar
              className="w-[40vw] max-w-[300px] hidden md:flex flex-col items-center justify-start gap-6 pt-12 bg-primary-color rounded-none"
            >
              {
                Array.from({ length: 4 }, (_, i) => i).map((index) => (
                  <div key={index} className="w-[90%] flex items-center justify-start gap-4">
                    <Skeleton className="w-[40px] h-[35px] rounded-sm" />

                    <Skeleton className="w-[90%] h-[35px] rounded-sm bg-tertiary-color" />
                  </div>
                ))
              }
            </Skeleton>

            <div className="w-full flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
        ) : ( // Not rendering the Sidebar skeleton
          <div className="w-full flex flex-col items-center justify-center">
            {children}
          </div>
        )
      }
    </main>
  );
};

export {
  LoadingPageSkeleton,
};
