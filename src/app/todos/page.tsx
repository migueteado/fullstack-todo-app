import { AlertMessage } from "@/components/AlertDestructive";
import { Header } from "@/components/Header";
import ToDoLists from "@/components/ToDoListList";
import { apiGetToDoLists } from "@/lib/api";
import { ErrorResponse, ToDoListManyResponse } from "@/lib/types";
import { cookies } from "next/headers";

export default async function Todos() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await apiGetToDoLists({ token: token });

  return (
    <>
      <Header />
      <main className="container">
        <div className="w-full max-w-4xl">
          <h1 className="page-title">ToDo Lists</h1>
          {res.status === "success" ? (
            <ToDoLists
              toDoLists={(res as ToDoListManyResponse).data.toDoLists}
            />
          ) : (
            <AlertMessage
              type="error"
              title="Error getting ToDo Lists"
              message={(res as ErrorResponse).message}
            />
          )}
        </div>
      </main>
    </>
  );
}
