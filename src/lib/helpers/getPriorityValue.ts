import { Priority } from "@prisma/client";

export function getPriorityValue(priority: Priority) {
  switch (priority) {
    case Priority.LOW:
      return 1;
    case Priority.MEDIUM:
      return 2;
    case Priority.HIGH:
      return 3;
    default:
      return 1;
  }
}
