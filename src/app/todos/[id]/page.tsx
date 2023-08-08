import { AlertMessage } from "@/components/AlertDestructive";
import { Header } from "@/components/Header";
import { apiGetToDoList } from "@/lib/api";
import { ErrorResponse, ToDoListResponse } from "@/lib/types";
import { ToDoList } from "@prisma/client";
import { cookies } from "next/headers";
import ToDoListView from "@/components/ToDoListView";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";

type Props = {
  params: { id: ToDoList["id"] };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await apiGetToDoList({ token: token, data: { id: params.id } });

  return {
    title: (res as ToDoListResponse).data.toDoList.title,
  };
}

export default async function Todo({ params }: Props) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const res = await apiGetToDoList({ token: token, data: { id: params.id } });

  return (
    <>
      <Header />
      <main className="container pt-24">
        <div className="w-full max-w-4xl mx-auto">
          <Link href="/todos" className="underline">
            <ChevronLeft className="inline-block w-4 h-4 mr-1" />
            To Dos
          </Link>
          <div className="pt-4">
            {res.status === "success" ? (
              <ToDoListView
                toDoList={(res as ToDoListResponse).data.toDoList}
              />
            ) : (
              <AlertMessage
                type="error"
                title="Error getting ToDo Lists"
                message={(res as ErrorResponse).message}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
