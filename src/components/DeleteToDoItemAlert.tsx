"use client";

import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ToDoItem } from "@prisma/client";
import { apiDeleteToDoItem } from "@/lib/api";
import { ErrorResponse, ToDoItemDeleteResponse } from "@/lib/types";

interface DeleteToDoItemAlertProps {
  toDoItem: ToDoItem;
  handleDelete: (id: ToDoItem["id"]) => void;
}

export default function DeleteToDoItemAlert({
  toDoItem,
  handleDelete,
}: DeleteToDoItemAlertProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onContinue() {
    const result = await apiDeleteToDoItem({
      data: { id: toDoItem.id, listId: toDoItem.listId },
    });

    if (result.status === "success") {
      const { deleteToDoItem } = (result as ToDoItemDeleteResponse).data;
      toast({
        title: "To Do Item deleted!",
        description: `To Do Item with content ${
          deleteToDoItem.content.length > 70
            ? deleteToDoItem.content.slice(0, 70) + "..."
            : deleteToDoItem.content
        } has been succesfully deleted.`,
      });
      handleDelete(deleteToDoItem.id);
      setOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete "${
              toDoItem.content.length > 70
                ? toDoItem.content.slice(0, 70) + "..."
                : toDoItem.content
            }" to
            do item and remove its data from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
