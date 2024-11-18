/*
  Warnings:

  - You are about to alter the column `status` on the `service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `service` MODIFY `status` ENUM('pending', 'inProgress', 'completed') NOT NULL;
