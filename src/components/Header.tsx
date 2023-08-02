"use client";

import { apiLogoutUser } from "@/lib/api";
import useSession from "@/lib/hooks/useSession";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

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

  const redirectToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full py-2 bg-white border-b text-slate-900 border-slate-200">
      <div className="flex flex-row items-center h-12 max-w-4xl px-2 mx-auto lg:px-12">
        <div className="text-lg font-bold">ToDo App</div>
        <div className="ml-auto mr-0">
          {user ? (
            <Button variant="destructive" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          ) : (
            <Button size="icon" onClick={redirectToLogin}>
              <LogIn className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
