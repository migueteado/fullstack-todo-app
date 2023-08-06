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
import { ToDoList } from "@prisma/client";
import { apiDeleteToDoList } from "@/lib/api";
import { ErrorResponse, ToDoListDeleteResponse } from "@/lib/types";

interface DeleteToDoListAlertProps {
  toDoList: ToDoList;
  handleDelete: (id: ToDoList["id"]) => void;
}

export default function DeleteToDoListAlert({
  toDoList,
  handleDelete,
}: DeleteToDoListAlertProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onContinue() {
    const result = await apiDeleteToDoList({ data: { id: toDoList.id } });

    if (result.status === "success") {
      const { deleteToDoList } = (result as ToDoListDeleteResponse).data;
      toast({
        title: "To Do List deleted!",
        description: `To Do List with title ${
          deleteToDoList.title.length > 70
            ? deleteToDoList.title.slice(0, 70) + "..."
            : deleteToDoList.title
        } has been succesfully deleted.`,
      });
      handleDelete(deleteToDoList.id);
      setOpen(false);
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete "${
              toDoList.title.length > 70
                ? toDoList.title.slice(0, 70) + "..."
                : toDoList.title
            }" to
            do list and remove its data from our servers.`}
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
