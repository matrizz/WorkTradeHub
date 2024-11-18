/*
  Warnings:

  - You are about to alter the column `location` on the `service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `service` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `category` VARCHAR(191) NULL,
    MODIFY `images` VARCHAR(191) NULL,
    MODIFY `location` JSON NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar_url` VARCHAR(191) NULL,
    ADD COLUMN `location` JSON NOT NULL,
    ADD COLUMN `site_link` VARCHAR(191) NULL,
    ADD COLUMN `social` VARCHAR(191) NULL;
