import MainMessage from "@/components/MainMessage";
import { RegisterForm } from "@/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - ToDoApp",
  description: "Free your memory and get things done.",
};

export default function Register() {
  return (
    <>
      <main className="main-container">
        <div className="grid min-h-screen lg:grid-cols-2">
          <MainMessage />
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-sm px-4 py-2">
              <h1 className="form-title">Create your new account</h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
