import { LoginForm } from "@/components/LoginForm";
import MainMessage from "@/components/MainMessage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ToDoApp",
  description: "Free your memory and get things done.",
};

export default function Login() {
  return (
    <>
      <main className="main-container">
        <div className="grid min-h-screen lg:grid-cols-2">
          <MainMessage />
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-sm px-4 py-2">
              <h1 className="form-title">Log in to your account</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
