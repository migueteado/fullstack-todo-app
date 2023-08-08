"use client";

import { Priority, ToDoItem, ToDoList } from "@prisma/client";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import {
  ErrorResponse,
  ToDoItemUpdateResponse,
  ToDoListObject,
} from "@/lib/types";
import DeleteToDoItemAlert from "./DeleteToDoItemAlert";
import UpdateToDoItemDialog from "./UpdateToDoItemDialog";
import { useState } from "react";
import CreateToDoItemDialog from "./CreateToDoItemDialog";
import { ChevronDown, ChevronUp, Equal, Loader2 } from "lucide-react";
import UpdateToDoListDialog from "./UpdateToDoListDialog";
import { Checkbox } from "./ui/checkbox";
import { apiUpdateToDoItem } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { sortByCompletion, sortByPriority } from "@/lib/helpers/sortToDoItems";
import { Toggle } from "./ui/toggle";
import { Progress } from "./ui/progress";

interface DueDateProps {
  dueDate: ToDoItem["dueDate"];
}

function DueDate({ dueDate }: DueDateProps) {
  return (
    <div>
      {dueDate ? (
        <div className="text-xs text-slate-400">
          {new Date(dueDate).toLocaleDateString()}
        </div>
      ) : (
        <div className="text-xs text-slate-400">No due date</div>
      )}
    </div>
  );
}
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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function completeCheckChange(checked: boolean) {
    setLoading(true);
    const result = await apiUpdateToDoItem({
      data: { ...toDoItem, completed: checked },
    });

    setLoading(false);
    if (result.status === "success") {
      toast({
        title: "To Do Item updated!",
        description: `To Do Item with content ${(
          result as ToDoItemUpdateResponse
        ).data.toDoItem.content.slice(0, 70)} has been succesfully updated.`,
      });
      updateToDoItem(
        toDoItem.id,
        (result as ToDoItemUpdateResponse).data.toDoItem
      );
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <Card
      className={`w-full hover:bg-secondary ${
        toDoItem.completed ? "bg-secondary" : ""
      }`}
    >
      <div className="flex flex-col items-start px-4 py-2 lg:items-center lg:flex-row">
        <div className="flex flex-row items-center justify-start w-full mb-4 lg:pr-4 lg:mb-0 grow">
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Checkbox
              id={toDoItem.id}
              className="mr-2"
              defaultChecked={toDoItem.completed}
              checked={toDoItem.completed}
              onCheckedChange={completeCheckChange}
            />
          )}
          <PriorityIndicator priority={toDoItem.priority} />
          <div
            className={`flex flex-col ${
              toDoItem.completed ? "line-through text-slate-400" : ""
            }`}
          >
            {toDoItem.content}
            <DueDate dueDate={toDoItem.dueDate} />
          </div>
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
  const [currentToDoList, setCurrentToDoList] =
    useState<ToDoListObject>(toDoList);
  const [toDoItems, setToDoItems] = useState<ToDoItem[]>(
    currentToDoList.items.sort(sortByPriority)
  );
  const [completed, setCompleted] = useState<number>(
    toDoItems.filter((toDoItem) => toDoItem.completed).length
  );
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleShowCompleted = (pressed: boolean) => {
    setShowCompleted(pressed);
  };

  const addToDoItem = (toDoItem: ToDoItem) => {
    const newToDoItems = [...toDoItems, toDoItem].sort(sortByPriority);
    setToDoItems(newToDoItems);
    setCompleted(newToDoItems.filter((toDoItem) => toDoItem.completed).length);
  };

  const removeToDoItem = (id: ToDoItem["id"]) => {
    const newToDoItems = toDoItems
      .filter((toDoItem) => toDoItem.id !== id)
      .sort(sortByPriority);
    setToDoItems(newToDoItems);
    setCompleted(newToDoItems.filter((toDoItem) => toDoItem.completed).length);
  };

  const updateToDoItem = (id: ToDoItem["id"], set: Omit<ToDoItem, "id">) => {
    const newToDoItems = toDoItems
      .map((toDoItem) => {
        if (toDoItem.id === id) {
          return { ...toDoItem, ...set };
        } else {
          return toDoItem;
        }
      })
      .sort(sortByPriority);
    setToDoItems(newToDoItems);
    setCompleted(newToDoItems.filter((toDoItem) => toDoItem.completed).length);
  };

  const updateToDoList = (id: ToDoList["id"], set: Partial<ToDoList>) => {
    setCurrentToDoList({ ...currentToDoList, ...set });
  };

  return (
    <>
      <div className="flex gap-4">
        <h1 className="page-title">{currentToDoList.title}</h1>
        <UpdateToDoListDialog
          toDoList={currentToDoList}
          handleUpdate={updateToDoList}
        />
      </div>
      <div className="flex flex-col items-center justify-between py-2 lg:flex-row">
        <div className="mb-2 ml-auto mr-0 text-sm lg:ml-0 lg:mr-auto text-slate-500 lg:mb-0">
          ({completed} / {toDoItems.length}){" "}
          {((completed / toDoItems.length) * 100).toFixed(2)}% completed
        </div>
        <div className="flex justify-end gap-2 ml-auto mr-0">
          <Toggle
            defaultPressed={showCompleted}
            pressed={showCompleted}
            onPressedChange={toggleShowCompleted}
          >
            Show Completed
          </Toggle>
          <CreateToDoItemDialog
            listId={currentToDoList.id}
            handleCreate={addToDoItem}
          />
        </div>
      </div>
      <Separator />
      <div className="py-2">
        <Progress value={(completed / toDoItems.length) * 100} />
      </div>

      <Separator />
      <div className="flex flex-col items-center justify-center gap-2 py-2">
        {toDoItems && toDoItems.length > 0 ? (
          toDoItems
            .filter((toDoItem) => (showCompleted ? true : !toDoItem.completed))
            .map((toDoItem) => (
              <ToDoItemCard
                toDoItem={toDoItem}
                key={currentToDoList.id}
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
