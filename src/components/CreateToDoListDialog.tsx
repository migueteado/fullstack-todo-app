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
import { CreateToDoListSchema } from "@/lib/validations/toDoList.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { apiCreateToDoList } from "@/lib/api";
import {
  ErrorResponse,
  ToDoListCreateResponse,
  ToDoListObject,
} from "@/lib/types";
import { useState } from "react";

const formSchema = CreateToDoListSchema;

interface CreateToDoListDialogProps {
  handleCreate: (toDoList: ToDoListObject) => void;
}

export function CreateToDoListDialog({
  handleCreate,
}: CreateToDoListDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await apiCreateToDoList({ data: values });

    if (result.status === "success") {
      toast({
        title: "To Do List created!",
        description: `To Do List with title ${
          (result as ToDoListCreateResponse).data.toDoList.title
        } has been succesfully created.`,
      });
      handleCreate((result as ToDoListCreateResponse).data.toDoList);
      form.reset();
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
        <Button size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create List</DialogTitle>
              <DialogDescription>
                Write a title for your new To Do List. Click create when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
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
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
