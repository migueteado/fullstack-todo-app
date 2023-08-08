-- DropForeignKey
ALTER TABLE "ToDoItem" DROP CONSTRAINT "ToDoItem_listId_fkey";

-- AddForeignKey
ALTER TABLE "ToDoItem" ADD CONSTRAINT "ToDoItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ToDoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
