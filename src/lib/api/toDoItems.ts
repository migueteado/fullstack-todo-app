import { ToDoItem } from "@prisma/client";
import {
  RequiresAuth,
  ToDoItemCreateResponse,
  ToDoItemDeleteResponse,
  ToDoItemUpdateResponse,
} from "../types";
import { SERVER_ENDPOINT } from "./config";

interface ApiCreateToDoItemArgs extends RequiresAuth {
  data: Omit<ToDoItem, "id" | "createdAt" | "updatedAt">;
}

export async function apiCreateToDoItem({
  data,
  token,
}: ApiCreateToDoItemArgs): Promise<ToDoItem> {
  const { listId, ...rest } = data;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${listId}`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(rest),
  });

  return handleResponse<ToDoItemCreateResponse>(response).then(
    (data) => data.data.toDoItem
  );
}

interface ApiUpdateToDoItemArgs extends RequiresAuth {
  data: Partial<ToDoItem>;
}

export async function apiUpdateToDoItem({
  data,
  token,
}: ApiUpdateToDoItemArgs): Promise<ToDoItem> {
  const { id, listId, ...rest } = data;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${listId}/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers,
    body: JSON.stringify(rest),
  });

  return handleResponse<ToDoItemUpdateResponse>(response).then(
    (data) => data.data.toDoItem
  );
}

interface ApiDeleteToDoItemArgs extends RequiresAuth {
  data: Pick<ToDoItem, "id" | "listId">;
}

export async function apiDeleteToDoItem({
  data,
  token,
}: ApiDeleteToDoItemArgs): Promise<ToDoItem> {
  const { listId, id } = data;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${listId}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  return handleResponse<ToDoItemDeleteResponse>(response).then(
    (data) => data.data.deleteToDoItem
  );
}
