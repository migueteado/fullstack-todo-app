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
import { useToast } from "@/components/ui/use-toast";
import { UpdateToDoListSchema } from "@/lib/validations/toDoList.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, Pencil, Plus } from "lucide-react";
import {
  apiCreateToDoItem,
  apiUpdateToDoItem,
  apiUpdateToDoList,
} from "@/lib/api";
import {
  ErrorResponse,
  ToDoItemCreateResponse,
  ToDoItemUpdateResponse,
} from "@/lib/types";
import { useState } from "react";
import { Priority, ToDoItem, ToDoList } from "@prisma/client";
import {
  CreateToDoItemSchema,
  UpdateToDoItemSchema,
} from "@/lib/validations/toDoItem.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const formSchema = CreateToDoItemSchema;

interface CreateToDoItemDialogProps {
  listId: ToDoList["id"];
  handleCreate: (toDoItem: ToDoItem) => void;
}

export default function CreateToDoItemDialog({
  listId,
  handleCreate,
}: CreateToDoItemDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      priority: Priority.MEDIUM,
      listId: listId,
      dueDate: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await apiCreateToDoItem({ data: values });

    if (result.status === "success") {
      toast({
        title: "To Do Item created!",
        description: `To Do Item with content ${(
          result as ToDoItemCreateResponse
        ).data.toDoItem.content.slice(0, 70)} has been succesfully created.`,
      });
      handleCreate((result as ToDoItemCreateResponse).data.toDoItem);
      form.reset();
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
              <DialogTitle>Create Item</DialogTitle>
              <DialogDescription>Modify your to do item.</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="My amazing item" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(
                        Object.keys(Priority) as Array<keyof typeof Priority>
                      ).map((key) => (
                        <SelectItem key={key} value={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
