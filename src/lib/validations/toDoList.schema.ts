import { z } from "zod";

export const CreateToDoListSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title is required"),
});

export const UpdateToDoListSchema = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title is required"),
});

export const DeleteToDoListSchema = z.object({
  id: z.string({
    required_error: "Id is required",
  }),
});

export type CreateToDoListInput = z.infer<typeof CreateToDoListSchema>;
export type UpdateToDoListInput = z.infer<typeof UpdateToDoListSchema>;
export type DeleteToDoListInput = z.infer<typeof DeleteToDoListSchema>;
