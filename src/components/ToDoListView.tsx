"use client";

import { Priority, ToDoItem } from "@prisma/client";
import { CreateToDoListDialog } from "./CreateToDoListDialog";
import { AlertMessage } from "./AlertDestructive";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { ToDoListObject } from "@/lib/types";
import DeleteToDoItemAlert from "./DeleteToDoItemAlert";
import UpdateToDoItemDialog from "./UpdateToDoItemDialog";
import { useState } from "react";
import CreateToDoItemDialog from "./CreateToDoItemDialog";
import { ChevronDown, ChevronUp, Equal } from "lucide-react";
import { getPriorityValue } from "@/lib/helpers/getPriorityValue";

interface PriorityIndicatorProps {
  priority: Priority;
}
function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  return (
    <>
      {priority === Priority.HIGH ? (
        <ChevronUp className="w-4 h-4 mr-2 text-red-500" />
      ) : priority === Priority.MEDIUM ? (
        <Equal className="w-4 h-4 mr-2 text-yellow-500" />
      ) : (
        <ChevronDown className="w-4 h-4 mr-2 text-blue-500" />
      )}
    </>
  );
}

interface ToDoItemCardProps {
  toDoItem: ToDoItem;
  removeToDoItem: (id: ToDoItem["id"]) => void;
  updateToDoItem: (id: ToDoItem["id"], set: Omit<ToDoItem, "id">) => void;
}

function ToDoItemCard({
  toDoItem,
  removeToDoItem,
  updateToDoItem,
}: ToDoItemCardProps) {
  return (
    <Card className="w-full hover:bg-secondary">
      <div className="flex flex-col items-start px-4 py-2 lg:items-center lg:flex-row">
        <div className="flex flex-row items-center justify-start w-full mb-4 lg:pr-4 lg:mb-0 grow">
          <PriorityIndicator priority={toDoItem.priority} />
          <div>{toDoItem.content}</div>
        </div>
        <div className="grid items-center grid-cols-2 gap-2 ml-auto mr-0">
          <UpdateToDoItemDialog
            toDoItem={toDoItem}
            handleUpdate={updateToDoItem}
          />
          <DeleteToDoItemAlert
            toDoItem={toDoItem}
            handleDelete={removeToDoItem}
          />
        </div>
      </div>
    </Card>
  );
}

interface ToDoListProps {
  toDoList: ToDoListObject;
}

export default function ToDoListView({ toDoList }: ToDoListProps) {
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>(toDoList.items);
  const addToDoItem = (toDoItem: ToDoItem) => {
    setToDoItems([...toDoItems, toDoItem]);
  };

  const removeToDoItem = (id: ToDoItem["id"]) => {
    setToDoItems(toDoItems.filter((toDoItem) => toDoItem.id !== id));
  };

  const updateToDoItem = (id: ToDoItem["id"], set: Omit<ToDoItem, "id">) => {
    setToDoItems(
      toDoItems.map((toDoItem) => {
        if (toDoItem.id === id) {
          return { ...toDoItem, ...set };
        } else {
          return toDoItem;
        }
      })
    );
  };

  return (
    <>
      <h1 className="page-title">{toDoList.title}</h1>
      <div className="flex justify-end py-2">
        <CreateToDoItemDialog listId={toDoList.id} handleCreate={addToDoItem} />
      </div>
      <Separator />
      <div className="flex flex-col items-center justify-center gap-2 py-2">
        {toDoItems && toDoItems.length > 0 ? (
          toDoItems
            .sort((a, b) => {
              const aValue = getPriorityValue(a.priority);
              const bValue = getPriorityValue(b.priority);
              return bValue - aValue;
            })
            .map((toDoItem) => (
              <ToDoItemCard
                toDoItem={toDoItem}
                key={toDoList.id}
                removeToDoItem={removeToDoItem}
                updateToDoItem={updateToDoItem}
              />
            ))
        ) : (
          <p>Start by creating your first to do item.</p>
        )}
      </div>
    </>
  );
}
