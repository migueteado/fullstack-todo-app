import { z } from "zod";

export const CreateToDoItemSchema = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(3, "Content is required"),
});

export const UpdateToDoItemSchema = z.object({
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
});

export const DeleteToDoItemSchema = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
});

export type CreateToDoItemInput = z.infer<typeof CreateToDoItemSchema>;
export type UpdateToDoItemInput = z.infer<typeof UpdateToDoItemSchema>;
export type DeleteToDoItemInput = z.infer<typeof DeleteToDoItemSchema>;
