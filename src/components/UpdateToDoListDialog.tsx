"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useToast } from "./ui/use-toast";
import { UpdateToDoListSchema } from "@/lib/validations/toDoList.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { apiUpdateToDoList } from "@/lib/api";
import {
  ErrorResponse,
  ToDoListUpdateResponse,
  ToDoListObject,
} from "@/lib/types";
import { useState } from "react";
import { ToDoList } from "@prisma/client";

const formSchema = UpdateToDoListSchema;

interface UpdateToDoListDialogProps {
  toDoList: ToDoListObject;
  handleUpdate: (id: ToDoList["id"], set: ToDoListObject) => void;
}

export default function UpdateToDoListDialog({
  toDoList,
  handleUpdate,
}: UpdateToDoListDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: toDoList.id,
      title: toDoList.title,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("executes");
    const result = await apiUpdateToDoList({ data: values });

    if (result.status === "success") {
      toast({
        title: "To Do List updated!",
        description: `To Do List with title ${
          (result as ToDoListUpdateResponse).data.toDoList.title
        } has been succesfully updated.`,
      });
      handleUpdate(
        toDoList.id,
        (result as ToDoListUpdateResponse).data.toDoList
      );
      setOpen(false);
    } else {
      toast({
        title: "An error occured!",
        description: (result as ErrorResponse).message,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Update List</DialogTitle>
              <DialogDescription>
                Write a new title for your To Do List. Click update when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="My amazing list" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="My amazing list" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
