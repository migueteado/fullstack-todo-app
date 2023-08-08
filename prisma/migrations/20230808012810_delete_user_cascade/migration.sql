-- DropForeignKey
ALTER TABLE "ToDoList" DROP CONSTRAINT "ToDoList_userId_fkey";

-- AddForeignKey
ALTER TABLE "ToDoList" ADD CONSTRAINT "ToDoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
