import MainMessage from "@/components/MainMessage";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home - ToDoApp",
  description: "Free your memory and get things done.",
};

export default function Home() {
  return (
    <main className="main-container">
      <div className="grid min-h-screen lg:grid-cols-2">
        <MainMessage />
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-sm px-4 py-2">
            <h1 className="form-title">Do you have an account?</h1>

            <div className="flex flex-col items-start justify-center gap-4">
              <p>If so, then</p>
              <Link href="/auth/login" className="block w-full">
                <Button className="w-full">Login</Button>
              </Link>
              <p>Otherwise, you should register to use the app.</p>
              <Link href="/auth/login" className="block w-full">
                <Button className="w-full" variant="outline">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
