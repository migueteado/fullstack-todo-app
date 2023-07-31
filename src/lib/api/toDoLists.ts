import {
  RequiresAuth,
  ToDoListCreateResponse,
  ToDoListDeleteResponse,
  ToDoListManyResponse,
  ToDoListObject,
  ToDoListResponse,
  ToDoListUpdateResponse,
} from "../types";
import { SERVER_ENDPOINT } from "./config";

interface ApiGetToDoListArgs extends RequiresAuth {
  data: {
    id: string;
  };
}

export async function apiGetToDoList({
  data,
  token,
}: ApiGetToDoListArgs): Promise<ToDoListObject> {
  const { id } = data;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${id}`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<ToDoListResponse>(response).then(
    (data) => data.data.toDoList
  );
}

interface ApiGetToDoListsArgs extends RequiresAuth {}

export async function apiGetToDoLists({
  token,
}: ApiGetToDoListsArgs): Promise<ToDoListObject[]> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<ToDoListManyResponse>(response).then(
    (data) => data.data.toDoLists
  );
}

interface ApiCreateToDoListArgs extends RequiresAuth {
  data: {
    title: string;
  };
}

export async function apiCreateToDoList({
  data,
  token,
}: ApiCreateToDoListArgs): Promise<ToDoListObject> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify(data),
  });

  return handleResponse<ToDoListCreateResponse>(response).then(
    (data) => data.data.toDoList
  );
}

interface ApiUpdateToDoListArgs extends RequiresAuth {
  data: {
    id: string;
    title: string;
  };
}

export async function apiUpdateToDoList({
  data,
  token,
}: ApiUpdateToDoListArgs): Promise<ToDoListObject> {
  const { id, ...rest } = data;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers,
    body: JSON.stringify(rest),
  });

  return handleResponse<ToDoListUpdateResponse>(response).then(
    (data) => data.data.toDoList
  );
}

interface ApiDeleteToDoListArgs extends RequiresAuth {
  data: {
    id: string;
  };
}

export async function apiDeleteToDoList({
  data,
  token,
}: ApiDeleteToDoListArgs): Promise<ToDoListObject> {
  const { id } = data;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/todos/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  return handleResponse<ToDoListDeleteResponse>(response).then(
    (data) => data.data.deleteToDoList
  );
}
