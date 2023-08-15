import { Prisma, PrismaClient } from "@prisma/client";

const lists: Prisma.ToDoListUncheckedCreateInput[] = [
  {
    id: "cllbor44u0001v7g6exahte3q",
    title: "My first todo list",
    userId: "clla7698f0003v7fb0zc2tk21",
  },
  {
    id: "cllborbzx0003v7g6d0csx79q",
    title: "My second todo list, this is for work",
    userId: "clla7698f0003v7fb0zc2tk21",
  },
  {
    id: "cllborq4z0005v7g66zup1tyo",
    title: "My third todo list, this is for studying",
    userId: "clla7698f0003v7fb0zc2tk21",
  },
];

export const seedToDoLists = async (prismaClient: PrismaClient) => {
  const seededToDoLists = await prismaClient.toDoList.createMany({
    data: lists,
    skipDuplicates: true,
  });

  console.log(`Lists Added: ${seededToDoLists.count}`);

  return;
};
