import { getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import {
  CreateToDoItemInput,
  CreateToDoItemSchema,
  DeleteToDoItemSchema,
  UpdateToDoItemInput,
  UpdateToDoItemSchema,
} from "@/lib/validations/toDoItem.schema";
import {
  DeleteToDoListSchema,
  UpdateToDoListInput,
  UpdateToDoListSchema,
} from "@/lib/validations/toDoList.schema";
import { Priority } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const userId = req.headers.get("X-USER-ID");
  const { slug } = params;
  const [listId] = slug;

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  const toDoList = await prisma.toDoList.findUnique({
    where: { id: listId },
    include: { items: true },
  });

  return NextResponse.json({
    status: "success",
    data: { toDoList },
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const userId = req.headers.get("X-USER-ID");
  const { slug } = params;
  const [listId] = slug;

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  try {
    const body = (await req.json()) as CreateToDoItemInput;
    const data = CreateToDoItemSchema.parse({ ...body, listId: listId });

    let priority: Priority | undefined = undefined;
    switch (data.priority) {
      case "LOW":
        priority = Priority.LOW;
        break;
      case "MEDIUM":
        priority = Priority.MEDIUM;
        break;
      case "HIGH":
        priority = Priority.HIGH;
        break;
      default:
        priority = undefined;
        break;
    }

    const toDoItem = await prisma.toDoItem.create({
      data: {
        content: data.content,
        completed: false,
        listId: data.listId,
        priority,
      },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { toDoItem },
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
      return getErrorResponse(409, "item with that content already exists");
    }

    return getErrorResponse(500, error.message);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const userId = req.headers.get("X-USER-ID");
  const { slug } = params;
  const [list, itemId] = slug;

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  try {
    if (itemId) {
      const body = (await req.json()) as UpdateToDoItemInput;
      const data = UpdateToDoItemSchema.parse({
        ...body,
        id: itemId,
        listId: list,
      });
      const { id, listId, ...rest } = data;

      let priority: Priority | undefined = undefined;
      switch (data.priority) {
        case "LOW":
          priority = Priority.LOW;
          break;
        case "MEDIUM":
          priority = Priority.MEDIUM;
          break;
        case "HIGH":
          priority = Priority.HIGH;
          break;
        default:
          priority = undefined;
          break;
      }

      const toDoItem = await prisma.toDoItem.update({
        where: { id: id },
        data: {
          ...rest,
          priority,
        },
      });

      return new NextResponse(
        JSON.stringify({
          status: "success",
          data: { toDoItem },
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      const body = (await req.json()) as UpdateToDoListInput;
      const data = UpdateToDoListSchema.parse({
        ...body,
        id: list,
      });
      const { id, ...rest } = data;

      const toDoList = await prisma.toDoList.update({
        where: { id: id },
        data: {
          ...rest,
        },
        include: { items: true },
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
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "item with that content already exists");
    }

    return getErrorResponse(500, error.message);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const userId = req.headers.get("X-USER-ID");
  const { slug } = params;
  const [listId, itemId] = slug;

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access."
    );
  }

  try {
    if (itemId) {
      const data = DeleteToDoItemSchema.parse({ id: itemId, listId: listId });

      const deleteToDoItem = await prisma.toDoItem.delete({
        where: data,
      });

      return NextResponse.json({
        status: "success",
        data: { deleteToDoItem },
      });
    } else {
      const data = DeleteToDoListSchema.parse({ id: listId });

      const deleteToDoList = await prisma.toDoList.delete({
        where: data,
      });

      return NextResponse.json({
        status: "success",
        data: { deleteToDoList },
      });
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error.code === "P2025") {
      return getErrorResponse(
        404,
        "No list or item with the provided Id found."
      );
    }

    return getErrorResponse(500, error.message);
  }
}
