import { ErrorResponse } from "../types";

export function handleError(error: unknown): ErrorResponse {
  console.error(error);
  const message = (error as Error).message || "Something went wrong";

  return {
    status: "fail",
    message: message,
  };
}
