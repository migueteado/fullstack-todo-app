import { ErrorResponse, UserDeleteResponse, UserResponse } from "../types";
import { SERVER_ENDPOINT } from "./config";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

export async function apiGetAuthUser(
  token?: string
): Promise<UserResponse | ErrorResponse> {
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

  return handleResponse<UserResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

export async function apiDeleteAuthUser(
  token?: string
): Promise<UserDeleteResponse | ErrorResponse> {
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

  return handleResponse<UserDeleteResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
