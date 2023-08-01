import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/jwt";
import { getErrorResponse } from "./lib/helpers";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
  let token: string | undefined;

  if (req.cookies.has("token")) {
    token = req.cookies.get("token")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7);
  }

  if (
    req.nextUrl.pathname.startsWith("/auth/login") &&
    (!token || redirectToLogin)
  )
    return;

  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/api/users") ||
      req.nextUrl.pathname.startsWith("/api/todos") ||
      req.nextUrl.pathname.startsWith("/api/auth/logout"))
  ) {
    return getErrorResponse(
      401,
      "You are not logged in. Please provide a token to gain access."
    );
  }

  const response = NextResponse.next();

  try {
    if (token) {
      const { sub } = await verifyJWT<{ sub: string }>(token);
      response.headers.set("X-USER-ID", sub);
      (req as AuthenticatedRequest).user = { id: sub };
    }
  } catch (error) {
    redirectToLogin = true;
    if (req.nextUrl.pathname.startsWith("/api")) {
      return getErrorResponse(401, "Token is invalid or user doesn't exists");
    }

    return NextResponse.redirect(
      new URL(
        `/auth/login?${new URLSearchParams({ error: "badauth" })}`,
        req.url
      )
    );
  }

  const authUser = (req as AuthenticatedRequest).user;

  if (!authUser) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?${new URLSearchParams({
          error: "badauth",
          forceLogin: "true",
        })}`,
        req.url
      )
    );
  }

  if (req.url.includes("/auth/login") && authUser) {
    return NextResponse.redirect(new URL("/todos", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/profile",
    "/login",
    "/api/auth/logout",
    "/api/todos/:path*",
    "/api/users/:path*",
  ],
};
