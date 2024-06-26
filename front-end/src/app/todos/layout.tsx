import { Sidebar } from "@/components/molecules";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full min-h-[calc(100vh_-_min(20vh,_90px))] flex items-stretch justify-start">
      <Sidebar />

      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
