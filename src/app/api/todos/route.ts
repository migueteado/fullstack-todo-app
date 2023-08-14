import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis/redis";
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

  const cachedData = await redis.get(`todo-${userId}`);

  if (cachedData) {
    return NextResponse.json({
      status: "success",
      data: { toDoLists: JSON.parse(cachedData) },
    });
  }

  const toDoLists = await prisma.toDoList.findMany({
    where: { userId: userId },
    include: { items: true },
  });

  await redis.set(`todo-${userId}`, JSON.stringify(toDoLists), "EX", 60);

  return NextResponse.json({
    status: "success",
    data: { toDoLists },
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
      include: { items: true },
    });

    await redis.del(`todo-${userId}`);

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
      return getErrorResponse(409, "list with that title already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
