"use client";

import { useAppContext } from "@/providers/context/app-context";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { tokenService } from "@/lib/token-service";

function LogoutDialog({ children }: { children: React.ReactNode }) {
  const { setTodos, setCurrentUser } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/");

    tokenService.removeToken();
    setTodos([]);
    setCurrentUser(null);
    toast.success("Log out successful");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[min(96vw,_450px)] rounded-sm bg-primary-color text-tertiary-color border-none">
        <DialogHeader>
          <DialogTitle>You are about to be logged out?</DialogTitle>
          <DialogDescription className="text-gray-300">
            You will logged out and won&apos;t have access to you todos unless
            you logged in again. Proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start gap-3">
          <DialogClose asChild className="bg-tertiary-color text-primary-color">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            variant="destructive"
            className="text-tertiary-color"
            onClick={handleLogout}
          >
            Log me out!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { LogoutDialog };
