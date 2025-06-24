/*
  Warnings:

  - A unique constraint covering the columns `[id_user,id_activity]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_id_user_id_activity_key" ON "Enrollment"("id_user", "id_activity");
