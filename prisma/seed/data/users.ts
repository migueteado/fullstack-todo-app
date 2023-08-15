import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const users: Prisma.UserCreateManyInput[] = [
  {
    id: "clla7698f0003v7fb0zc2tk21",
    email: "initial@todoapp.com",
    password: "theamazingpassword1",
  },
];

export const seedUsers = async (prismaClient: PrismaClient) => {
  const seededUsers = await prismaClient.user.createMany({
    data: await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await hash(u.password, 12),
      }))
    ),
    skipDuplicates: true,
  });

  console.log(`Users Added: ${seededUsers.count}`);

  return;
};
