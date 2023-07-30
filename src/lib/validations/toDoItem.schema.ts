import { z } from "zod";

export const CreateToDoItemSchema = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(3, "Content is required"),
});
