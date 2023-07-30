import { z } from "zod";

export const CreateToDoItemSchema = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(3, "Content is required"),
  priority: z.string({
    invalid_type_error: "Priority must be a string",
  }),
  listId: z.string({
    required_error: "listId is required",
  }),
  dueDate: z
    .string()
    .datetime({ message: "Invalid datetime string! Must be UTC." }),
});

export const UpdateToDoItemSchema = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
  content: z
    .string({
      invalid_type_error: "Content must be a string",
    })
    .min(3, "Title is required"),
  completed: z.boolean({
    invalid_type_error: "Content must be a boolean",
  }),
  priority: z.string({
    invalid_type_error: "Priority must be a string",
  }),
  listId: z.string({
    required_error: "listId is required",
  }),
  dueDate: z
    .string()
    .datetime({ message: "Invalid datetime string! Must be UTC." }),
});

export const DeleteToDoItemSchema = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
  listId: z.string({
    required_error: "listId is required",
  }),
});

export type CreateToDoItemInput = z.infer<typeof CreateToDoItemSchema>;
export type UpdateToDoItemInput = z.infer<typeof UpdateToDoItemSchema>;
export type DeleteToDoItemInput = z.infer<typeof DeleteToDoItemSchema>;
