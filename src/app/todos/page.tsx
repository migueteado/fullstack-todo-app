"use client";

import { AlertMessage } from "@/components/AlertDestructive";
import { CreateToDoListDialog } from "@/components/CreateToDoListDialog";
import { Header } from "@/components/Header";
import { apiGetToDoLists } from "@/lib/api";
import { ErrorResponse, ToDoListManyResponse } from "@/lib/types";
import useStore from "@/store";
import { ToDoList } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Todos() {
  const store = useStore();
  const [todos, setTodos] = useState<ToDoList[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      store.setRequestLoading(true);
      const res = await apiGetToDoLists({ token: store.token || "" });

      if (res.status === "success") {
        setTodos((res as ToDoListManyResponse).data.toDoLists);
      } else {
        setErrorMessage((res as ErrorResponse).message);
      }
      store.setRequestLoading(false);
    };

    fetchTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createToDoList() {}

  return (
    <>
      <Header />
      <main className="container">
        <div className="w-full max-w-4xl">
          <h1 className="page-title">ToDo Lists</h1>
          <div className="flex justify-end py-2 mb-4 border-b border-slate-200">
            <CreateToDoListDialog />
          </div>
          <div className="flex flex-col items-center justify-center">
            {errorMessage && (
              <AlertMessage type="error" title="Error" message={errorMessage} />
            )}
            {todos && todos.length > 0 ? (
              <></>
            ) : (
              <p>Start by creating your first to do list.</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
