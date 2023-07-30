import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import {
  CreateToDoListInput,
  CreateToDoListSchema,
} from "@/lib/validations/toDoList.schema";
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

  const todos = await prisma.toDoList.findMany({
    where: { userId: userId },
    include: { items: true },
  });

  return NextResponse.json({
    status: "success",
    data: { todos: todos },
  });
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  try {
    const body = (await req.json()) as CreateToDoListInput;
    const data = CreateToDoListSchema.parse(body);

    const toDoList = await prisma.toDoList.create({
      data: {
        title: data.title,
        userId: userId,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { toDoList },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
