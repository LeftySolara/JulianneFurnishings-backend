/*
  Warnings:

  - You are about to alter the column `RegularPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `SalePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `Brand` MODIFY `Uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Category` MODIFY `Uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Color` MODIFY `Uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `Uuid` VARCHAR(191) NOT NULL,
    MODIFY `RegularPrice` DECIMAL NOT NULL,
    MODIFY `SalePrice` DECIMAL NULL;

-- AlterTable
ALTER TABLE `Room` MODIFY `Uuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `SubCategory` MODIFY `Uuid` VARCHAR(191) NOT NULL;
