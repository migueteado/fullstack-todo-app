import { z } from "zod";

export const CreateToDoListSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title is required"),
});

export const UpdateToDoListSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(3, "Title is required"),
});
