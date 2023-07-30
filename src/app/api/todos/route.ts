import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  const todos = await prisma.toDoList.findMany({
    where: { userId: userId },
    include: { items: true },
  });

  return NextResponse.json({
    status: "success",
    data: { todos: todos },
  });
}
