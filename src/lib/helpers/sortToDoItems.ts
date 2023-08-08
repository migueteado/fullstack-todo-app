import { ToDoItem } from "@prisma/client";
import { getPriorityValue } from "./getPriorityValue";

export function sortByPriority(a: ToDoItem, b: ToDoItem) {
  const aValue = getPriorityValue(a.priority);
  const bValue = getPriorityValue(b.priority);
  return bValue - aValue;
}

export function sortByCompletion(a: ToDoItem, b: ToDoItem) {
  return a.completed === b.completed ? 0 : a ? -1 : 1;
}
