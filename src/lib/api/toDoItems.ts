import { ToDoItem } from "@prisma/client";
import {
  ErrorResponse,
  RequiresAuth,
  ToDoItemCreateResponse,
  ToDoItemDeleteResponse,
  ToDoItemUpdateResponse,
} from "../types";
import { SERVER_ENDPOINT } from "./config";
import { handleResponse } from "./handleResponse";
import { handleError } from "./handleError";

interface ApiCreateToDoItemArgs extends RequiresAuth {
  data: Omit<ToDoItem, "id" | "createdAt" | "updatedAt" | "completed">;
}

export async function apiCreateToDoItem({
  data,
  token,
}: ApiCreateToDoItemArgs): Promise<ToDoItemCreateResponse | ErrorResponse> {
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

  return handleResponse<ToDoItemCreateResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

interface ApiUpdateToDoItemArgs extends RequiresAuth {
  data: Partial<ToDoItem>;
}

export async function apiUpdateToDoItem({
  data,
  token,
}: ApiUpdateToDoItemArgs): Promise<ToDoItemUpdateResponse | ErrorResponse> {
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

  return handleResponse<ToDoItemUpdateResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

interface ApiDeleteToDoItemArgs extends RequiresAuth {
  data: Pick<ToDoItem, "id" | "listId">;
}

export async function apiDeleteToDoItem({
  data,
  token,
}: ApiDeleteToDoItemArgs): Promise<ToDoItemDeleteResponse | ErrorResponse> {
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

  return handleResponse<ToDoItemDeleteResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
