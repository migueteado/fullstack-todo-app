import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./data/users";
import { seedToDoLists } from "./data/toDoLists";
import { seedToDoItems } from "./data/toDoItems";

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedToDoLists(prisma);
  await seedToDoItems(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
