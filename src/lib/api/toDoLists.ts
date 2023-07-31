import {
  ErrorResponse,
  RequiresAuth,
  ToDoListCreateResponse,
  ToDoListDeleteResponse,
  ToDoListManyResponse,
  ToDoListResponse,
  ToDoListUpdateResponse,
} from "../types";
import { SERVER_ENDPOINT } from "./config";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

interface ApiGetToDoListArgs extends RequiresAuth {
  data: {
    id: string;
  };
}

export async function apiGetToDoList({
  data,
  token,
}: ApiGetToDoListArgs): Promise<ToDoListResponse | ErrorResponse> {
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

  return handleResponse<ToDoListResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

interface ApiGetToDoListsArgs extends RequiresAuth {}

export async function apiGetToDoLists({
  token,
}: ApiGetToDoListsArgs): Promise<ToDoListManyResponse | ErrorResponse> {
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

  return handleResponse<ToDoListManyResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

interface ApiCreateToDoListArgs extends RequiresAuth {
  data: {
    title: string;
  };
}

export async function apiCreateToDoList({
  data,
  token,
}: ApiCreateToDoListArgs): Promise<ToDoListCreateResponse | ErrorResponse> {
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

  return handleResponse<ToDoListCreateResponse>(response)
    .then((data) => data)
    .catch(handleError);
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
}: ApiUpdateToDoListArgs): Promise<ToDoListUpdateResponse | ErrorResponse> {
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

  return handleResponse<ToDoListUpdateResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

interface ApiDeleteToDoListArgs extends RequiresAuth {
  data: {
    id: string;
  };
}

export async function apiDeleteToDoList({
  data,
  token,
}: ApiDeleteToDoListArgs): Promise<ToDoListDeleteResponse | ErrorResponse> {
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

  return handleResponse<ToDoListDeleteResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
