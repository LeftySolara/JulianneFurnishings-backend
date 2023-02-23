/*
  Warnings:

  - You are about to alter the column `RegularPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `SalePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.

*/
-- AlterTable
ALTER TABLE `Brand` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `DeletedAt` DATETIME(3) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `DeletedAt` DATETIME(3) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Color` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `DeletedAt` DATETIME(3) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `RegularPrice` DECIMAL NOT NULL,
    MODIFY `SalePrice` DECIMAL NULL;

-- AlterTable
ALTER TABLE `Room` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `DeletedAt` DATETIME(3) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `SubCategory` ADD COLUMN `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `DeletedAt` DATETIME(3) NULL,
    ADD COLUMN `UpdatedAt` DATETIME(3) NULL;
