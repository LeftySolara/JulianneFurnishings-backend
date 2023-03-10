-- CreateTable
CREATE TABLE `Product` (
    `ProductId` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` BINARY(16) NOT NULL,
    `Slug` VARCHAR(22) NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NULL,
    `DeletedAt` DATETIME(3) NULL,
    `Name` TEXT NOT NULL,
    `Description` TEXT NOT NULL,
    `RegularPrice` DECIMAL NOT NULL,
    `SalePrice` DECIMAL NULL,
    `ImageURL` TEXT NULL,
    `CategoryId` INTEGER NOT NULL,
    `SubCategoryId` INTEGER NOT NULL,
    `RoomId` INTEGER NULL,
    `BrandId` INTEGER NOT NULL,
    `ColorId` INTEGER NOT NULL,

    UNIQUE INDEX `Product_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Product_Slug_key`(`Slug`),
    PRIMARY KEY (`ProductId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `CategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` BINARY(16) NOT NULL,
    `Slug` VARCHAR(22) NULL,
    `Name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Category_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Category_Slug_key`(`Slug`),
    PRIMARY KEY (`CategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategory` (
    `SubCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` BINARY(16) NOT NULL,
    `Slug` VARCHAR(22) NULL,
    `Name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `SubCategory_Uuid_key`(`Uuid`),
    UNIQUE INDEX `SubCategory_Slug_key`(`Slug`),
    PRIMARY KEY (`SubCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `RoomId` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` BINARY(16) NOT NULL,
    `Slug` VARCHAR(22) NULL,
    `Name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Room_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Room_Slug_key`(`Slug`),
    PRIMARY KEY (`RoomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `BrandId` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` BINARY(16) NOT NULL,
    `Slug` VARCHAR(22) NULL,
    `Name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Brand_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Brand_Slug_key`(`Slug`),
    PRIMARY KEY (`BrandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Color` (
    `ColorId` INTEGER NOT NULL AUTO_INCREMENT,
    `Uuid` BINARY(16) NOT NULL,
    `Slug` VARCHAR(22) NULL,
    `Name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Color_Uuid_key`(`Uuid`),
    UNIQUE INDEX `Color_Slug_key`(`Slug`),
    PRIMARY KEY (`ColorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_CategoryId_fkey` FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`CategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_SubCategoryId_fkey` FOREIGN KEY (`SubCategoryId`) REFERENCES `SubCategory`(`SubCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_RoomId_fkey` FOREIGN KEY (`RoomId`) REFERENCES `Room`(`RoomId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_BrandId_fkey` FOREIGN KEY (`BrandId`) REFERENCES `Brand`(`BrandId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_ColorId_fkey` FOREIGN KEY (`ColorId`) REFERENCES `Color`(`ColorId`) ON DELETE RESTRICT ON UPDATE CASCADE;
