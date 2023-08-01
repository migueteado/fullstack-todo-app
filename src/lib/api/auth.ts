import {
  ErrorResponse,
  UserDeleteResponse,
  UserLoginResponse,
  UserRegisterResponse,
} from "../types";
import { LoginUserInput, RegisterUserInput } from "../validations/user.schema";
import { SERVER_ENDPOINT } from "./config";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";

interface ApiRegisterUserArgs {
  data: RegisterUserInput;
}

export async function apiRegisterUser({
  data,
}: ApiRegisterUserArgs): Promise<UserRegisterResponse | ErrorResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<UserRegisterResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

interface ApiLoginUserArgs {
  data: LoginUserInput;
}

export async function apiLoginUser({
  data,
}: ApiLoginUserArgs): Promise<UserLoginResponse | ErrorResponse> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<UserLoginResponse>(response)
    .then((data) => data)
    .catch(handleError);
}

export async function apiLogoutUser(): Promise<
  UserDeleteResponse | ErrorResponse
> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<UserDeleteResponse>(response)
    .then((data) => data)
    .catch(handleError);
}
