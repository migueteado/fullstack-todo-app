import { UserLoginResponse, UserObject, UserResponse } from "../types";
import { LoginUserInput, RegisterUserInput } from "../validations/user.schema";
import { SERVER_ENDPOINT } from "./config";

interface ApiRegisterUserArgs {
  data: RegisterUserInput;
}

export async function apiRegisterUser({
  data,
}: ApiRegisterUserArgs): Promise<UserObject> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

interface ApiLoginUserArgs {
  data: LoginUserInput;
}

export async function apiLoginUser({
  data,
}: ApiLoginUserArgs): Promise<string> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export async function apiLogoutUser(): Promise<void> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<void>(response);
}
