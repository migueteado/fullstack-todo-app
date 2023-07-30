/*
  Warnings:

  - A unique constraint covering the columns `[listId,content]` on the table `ToDoItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,title]` on the table `ToDoList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ToDoItem_listId_content_key" ON "ToDoItem"("listId", "content");

-- CreateIndex
CREATE UNIQUE INDEX "ToDoList_userId_title_key" ON "ToDoList"("userId", "title");
