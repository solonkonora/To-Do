import { AuthProvider } from "@/providers/auth-provider";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider strict>
      {children}
    </AuthProvider>
  );
};
