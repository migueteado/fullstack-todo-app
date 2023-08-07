"use client";

import { apiLogoutUser } from "@/lib/api";
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

export function Header() {
  const store = useStore();
  const user = useSession();
  const router = useRouter();

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

  return (
    <header className="fixed top-0 left-0 w-full py-2 bg-white border-b text-slate-900 border-slate-200">
      <div className="flex flex-row items-center h-12 px-4 mx-auto lg:px-12">
        <div className="text-lg font-bold">ToDo App</div>
        <div className="ml-auto mr-0">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account: {user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Eraser className="w-4 h-4 mr-2" />
                  <span>Delete Account</span>
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
          )}
        </div>
      </div>
    </header>
  );
}
