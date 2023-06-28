/*
  Warnings:

  - You are about to alter the column `regularPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,2)`.
  - You are about to alter the column `salePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `regularPrice` DECIMAL(10, 2) NOT NULL,
    MODIFY `salePrice` DECIMAL(10, 2) NULL;
