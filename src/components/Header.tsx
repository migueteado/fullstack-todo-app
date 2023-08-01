"use client";

import { apiLogoutUser } from "@/lib/api";
import useSession from "@/lib/hooks/useSession";
import useStore from "@/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

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
    <header className="fixed top-0 left-0 w-full py-2 bg-white border-b text-slate-900 border-slate-300">
      <div className="flex flex-row items-center h-12 max-w-4xl px-2 mx-auto lg:px-12">
        <div className="text-lg font-bold">ToDo App</div>
        <div className="ml-auto mr-0">
          {user ? (
            <Button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-400"
            >
              Logout
            </Button>
          ) : (
            <Button onClick={redirectToLogin}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}
