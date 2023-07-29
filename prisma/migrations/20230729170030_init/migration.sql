-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToDoList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ToDoList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToDoItem" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "priority" "Priority" NOT NULL,
    "dueDate" TIMESTAMP(3),
    "listId" TEXT NOT NULL,

    CONSTRAINT "ToDoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ToDoList" ADD CONSTRAINT "ToDoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToDoItem" ADD CONSTRAINT "ToDoItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ToDoList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
