/*
  Warnings:

  - You are about to drop the column `image` on the `service` table. All the data in the column will be lost.
  - Added the required column `images` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `service` DROP COLUMN `image`,
    ADD COLUMN `images` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL;
