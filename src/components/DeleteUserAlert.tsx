"use client";

import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { Eraser, Trash } from "lucide-react";
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
import { apiDeleteAuthUser, apiDeleteToDoList } from "@/lib/api";
import {
  ErrorResponse,
  ToDoListDeleteResponse,
  UserDeleteResponse,
} from "@/lib/types";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export default function DeleteUserAlert() {
  const { authUser } = useStore();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onContinue() {
    const result = await apiDeleteAuthUser();

    if (result.status === "success") {
      const { deleteUser } = (result as UserDeleteResponse).data;
      toast({
        title: "User deleted!",
        description: `User with email ${deleteUser.email} has been succesfully deleted.`,
      });
      setOpen(false);
      router.push("/");
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
        <Button className="flex">
          <Eraser className="w-4 h-4 mr-2" />
          <span>Delete User</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete your user with email ${authUser?.email} and remove its data from our servers.`}
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
