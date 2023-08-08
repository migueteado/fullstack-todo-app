"use client";

import { apiDeleteAuthUser, apiLogoutUser } from "@/lib/api";
import useSession from "@/lib/hooks/useSession";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Eraser, LogOut, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { ErrorResponse, UserDeleteResponse } from "@/lib/types";

export function Header() {
  const store = useStore();
  const user = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    store.setRequestLoading(true);
    try {
      await apiLogoutUser();
    } catch (error) {
    } finally {
      store.reset();
      router.push("/auth/login");
    }
  };

  async function onContinue() {
    const result = await apiDeleteAuthUser();

    if (result.status === "success") {
      const { deleteUser } = (result as UserDeleteResponse).data;
      toast({
        title: "User deleted!",
        description: `User with email ${deleteUser.email} has been succesfully deleted.`,
      });
      setOpen(false);
      router.push("/");
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full py-2 bg-white border-b text-slate-900 border-slate-200">
      <div className="flex flex-row items-center h-12 px-4 mx-auto lg:px-12">
        <div className="text-lg font-bold">ToDo App</div>
        <div className="ml-auto mr-0">
          {user && (
            <AlertDialog open={open} onOpenChange={setOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    My Account: {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                      <button className="flex">
                        <Eraser className="w-4 h-4 mr-2" />
                        <span>Delete User</span>
                      </button>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`This action cannot be undone. This will permanently delete your user with email ${user.email} and remove its data from our servers.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onContinue}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </header>
  );
}
