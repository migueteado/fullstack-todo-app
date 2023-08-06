import { Header } from "@/components/Header";
import { RegisterForm } from "@/components/RegisterForm";

export default function Register() {
  return (
    <>
      <Header />
      <main className="container">
        <div className="w-full max-w-4xl">
          <h1 className="page-title">Register</h1>
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
