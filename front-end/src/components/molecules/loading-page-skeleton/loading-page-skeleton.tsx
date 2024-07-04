"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TextLogo } from "@/components/ui/text-logo";
import { usePathname } from "next/navigation";

function ShimmerCard() {
  return (
    <div className="w-[90%] flex items-center justify-start gap-4">
      <Skeleton className="w-[40px] h-[35px] rounded-sm" />

      <Skeleton className="w-[90%] h-[35px] rounded-sm bg-tertiary-color" />
    </div>
  );
}

export default function LoadingPageSkeleton({
  children = null,
}: {
  children?: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <main className="fixed top-0 left-0 z-20 w-full min-h-screen flex flex-col items-start justify-start">
      <Skeleton // acting as top bar
        className="w-full h-[min(20vh,_90px)] flex items-center justify-between p-8 bg-secondary-color rounded-none"
      >
        <TextLogo />

        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-[40px] w-[40px] rounded-full" />
          <Skeleton className="w-[50px] h-[20px]" />
        </div>
      </Skeleton>

      <div className="w-full min-h-[calc(100vh_-_min(20vh,_90px))] hidden md:flex items-stretch justify-start">
        {pathName.includes("todos") && ( // only adding sibebar shimmer if we are in the /todos/... path
          <Skeleton // acting as sidebar
            className="w-[40vw] max-w-[300px] hidden md:flex flex-col items-center justify-between py-8 bg-primary-color rounded-none"
          >
            <div className="w-full flex flex-col items-center justify-start gap-6">
              {Array.from({ length: 3 }, (_, i) => i).map((index) => (
                <ShimmerCard key={index} />
              ))}
            </div>
            <ShimmerCard />
          </Skeleton>
        )}

        <div className="w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
}

export { LoadingPageSkeleton };
