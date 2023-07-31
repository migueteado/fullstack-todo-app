import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
}

export async function DELETE(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }
  try {
    const deleteUser = await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json({
      status: "success",
      data: { deleteUser: { ...deleteUser, password: undefined } },
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return getErrorResponse(404, "No user with the provided Id found.");
    }

    return getErrorResponse(500, error.message);
  }
}
