import { UserDeleteResponse, UserObject, UserResponse } from "../types";
import { SERVER_ENDPOINT } from "./config";

export async function apiGetUser(token?: string): Promise<UserObject> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/users`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export async function apiDeleteUser(token?: string): Promise<UserObject> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${SERVER_ENDPOINT}/api/users`, {
    method: "DELETE",
    credentials: "include",
    headers,
  });

  return handleResponse<UserDeleteResponse>(response).then(
    (data) => data.data.deleteUser
  );
}
