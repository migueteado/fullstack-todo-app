import { ToDoListDeleteResponse, ToDoListObject } from "../types";
import { SERVER_ENDPOINT } from "./config";

export async function apiDeleteToDoList(
  toDoListId: string,
  token?: string
): Promise<ToDoListObject> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${toDoListId}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  return handleResponse<ToDoListDeleteResponse>(response).then(
    (data) => data.data.deleteToDoList
  );
}
