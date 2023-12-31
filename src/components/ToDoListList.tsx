"use client";

import { ToDoList } from "@prisma/client";
import { useState } from "react";
import { CreateToDoListDialog } from "./CreateToDoListDialog";
import { AlertMessage } from "./AlertDestructive";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { ToDoListObject } from "@/lib/types";
import Link from "next/link";
import DeleteToDoListAlert from "./DeleteToDoListAlert";
import UpdateToDoListDialog from "./UpdateToDoListDialog";

interface ToDoListCardProps {
  toDoList: ToDoListObject;
  removeToDoList: (id: ToDoList["id"]) => void;
  updateToDoList: (id: ToDoList["id"], set: Omit<ToDoList, "id">) => void;
}

function ToDoListCard({
  toDoList,
  removeToDoList,
  updateToDoList,
}: ToDoListCardProps) {
  return (
    <Card className="w-full hover:bg-secondary">
      <div className="flex flex-col items-start px-4 py-2 lg:items-center lg:flex-row">
        <Link
          href={`/todos/${toDoList.id}`}
          className="flex flex-row justify-between w-full mb-4 lg:pr-4 lg:mb-0 grow"
        >
          <div>
            {toDoList.title.length > 70
              ? toDoList.title.slice(0, 70) + "..."
              : toDoList.title}
          </div>
          <div className="text-slate-400">
            ({toDoList.items.filter((i) => i.completed).length} /{" "}
            {toDoList.items.length})
          </div>
        </Link>
        <div className="grid items-center grid-cols-2 gap-2 ml-auto mr-0">
          <UpdateToDoListDialog
            toDoList={toDoList}
            handleUpdate={updateToDoList}
          />
          <DeleteToDoListAlert
            toDoList={toDoList}
            handleDelete={removeToDoList}
          />
        </div>
      </div>
    </Card>
  );
}

interface ToDoListListProps {
  toDoLists: ToDoListObject[];
}

export default function ToDoListList({ toDoLists }: ToDoListListProps) {
  const [todos, setTodos] = useState<ToDoListObject[]>(toDoLists);

  const addToDoList = (toDoList: ToDoListObject) => {
    setTodos([...todos, toDoList]);
  };

  const removeToDoList = (id: ToDoList["id"]) => {
    setTodos(todos.filter((toDoList) => toDoList.id !== id));
  };

  const updateToDoList = (id: ToDoList["id"], set: Omit<ToDoList, "id">) => {
    setTodos(
      todos.map((toDoList) => {
        if (toDoList.id === id) {
          return { ...toDoList, ...set };
        } else {
          return toDoList;
        }
      })
    );
  };

  return (
    <>
      <div className="flex justify-end py-2">
        <CreateToDoListDialog handleCreate={addToDoList} />
      </div>
      <Separator />
      <div className="flex flex-col items-center justify-center gap-2 py-2">
        {todos && todos.length > 0 ? (
          todos.map((toDoList) => (
            <ToDoListCard
              toDoList={toDoList}
              key={toDoList.id}
              removeToDoList={removeToDoList}
              updateToDoList={updateToDoList}
            />
          ))
        ) : (
          <p>Start by creating your first to do list.</p>
        )}
      </div>
    </>
  );
}
