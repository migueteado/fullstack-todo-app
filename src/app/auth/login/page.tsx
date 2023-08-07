import { LoginForm } from "@/components/LoginForm";

export default function Login() {
  return (
    <>
      <main className="main-container">
        <div className="grid min-h-screen lg:grid-cols-2">
          <div className="flex-col justify-between hidden p-8 bg-slate-300 lg:flex">
            <div className="text-4xl font-bold">ToDo App</div>
            <div className="max-w-md ml-auto mr-0 text-xl">
              &quot;Register your priorities, free up your memory and improve
              your focus. ToDo App is all you need, simple and easy to use. You
              are just one stay away from getting things done.&quot;
            </div>
          </div>
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
