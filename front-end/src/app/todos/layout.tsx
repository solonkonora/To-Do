import { Sidebar } from "@/components/molecules";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />

      <div className="w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
