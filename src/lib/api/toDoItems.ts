import { ToDoItemDeleteResponse, ToDoItemObject } from "../types";
import { SERVER_ENDPOINT } from "./config";

export async function apiDeleteToDoItem(
  toDoListId: string,
  toDoItemId: string,
  token?: string
): Promise<ToDoItemObject> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${SERVER_ENDPOINT}/api/todos/${toDoListId}/${toDoItemId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers,
    }
  );

  return handleResponse<ToDoItemDeleteResponse>(response).then(
    (data) => data.data.deleteToDoItem
  );
}
