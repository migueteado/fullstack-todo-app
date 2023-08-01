"use client";

import { Header } from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

export default function Login() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="w-full max-w-4xl">
          <h1 className="page-title">Login</h1>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
