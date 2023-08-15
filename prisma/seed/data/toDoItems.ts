import { Priority, Prisma, PrismaClient } from "@prisma/client";

const items: Prisma.ToDoItemCreateManyInput[] = [
  {
    id: "cllbp1dcr0007v7g6hphd7xyr",
    content: "Highest priority item",
    completed: true,
    priority: Priority.HIGH,
    listId: "cllbor44u0001v7g6exahte3q",
  },
  {
    id: "cllbp260j0009v7g6kit6936w",
    content: "The lowest priority item",
    completed: false,
    priority: Priority.LOW,
    listId: "cllbor44u0001v7g6exahte3q",
  },
  {
    id: "cllbp2j3p000bv7g6an8sg59f",
    content: "The middle priority item",
    completed: false,
    priority: Priority.MEDIUM,
    dueDate: "2023-08-16T05:00:00.000Z",
    listId: "cllbor44u0001v7g6exahte3q",
  },
];

export const seedToDoItems = async (prismaClient: PrismaClient) => {
  const seededToDoItems = await prismaClient.toDoItem.createMany({
    data: items,
    skipDuplicates: true,
  });

  console.log(`Items Added: ${seededToDoItems.count}`);

  return;
};
