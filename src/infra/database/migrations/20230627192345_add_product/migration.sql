-- CreateTable
CREATE TABLE `ProductCategory` (
    `productCategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `ProductCategory_slug_key`(`slug`),
    UNIQUE INDEX `ProductCategory_name_key`(`name`),
    PRIMARY KEY (`productCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductSubcategory` (
    `productSubcategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `ProductSubcategory_slug_key`(`slug`),
    UNIQUE INDEX `ProductSubcategory_name_key`(`name`),
    PRIMARY KEY (`productSubcategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductRoom` (
    `productRoomId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `ProductRoom_slug_key`(`slug`),
    UNIQUE INDEX `ProductRoom_name_key`(`name`),
    PRIMARY KEY (`productRoomId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductBrand` (
    `productBrandId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `ProductBrand_slug_key`(`slug`),
    UNIQUE INDEX `ProductBrand_name_key`(`name`),
    PRIMARY KEY (`productBrandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductColor` (
    `productColorId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `name` VARCHAR(256) NOT NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `ProductColor_slug_key`(`slug`),
    UNIQUE INDEX `ProductColor_name_key`(`name`),
    PRIMARY KEY (`productColorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,
    `name` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `regularPrice` DECIMAL NOT NULL,
    `salePrice` DECIMAL NULL,
    `imageURL` TEXT NULL,
    `productCategoryId` INTEGER NOT NULL,
    `productSubcategoryId` INTEGER NOT NULL,
    `productRoomId` INTEGER NULL,
    `productBrandId` INTEGER NOT NULL,
    `productColorId` INTEGER NOT NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `Product_slug_key`(`slug`),
    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productCategoryId_fkey` FOREIGN KEY (`productCategoryId`) REFERENCES `ProductCategory`(`productCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productSubcategoryId_fkey` FOREIGN KEY (`productSubcategoryId`) REFERENCES `ProductSubcategory`(`productSubcategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productRoomId_fkey` FOREIGN KEY (`productRoomId`) REFERENCES `ProductRoom`(`productRoomId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productBrandId_fkey` FOREIGN KEY (`productBrandId`) REFERENCES `ProductBrand`(`productBrandId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productColorId_fkey` FOREIGN KEY (`productColorId`) REFERENCES `ProductColor`(`productColorId`) ON DELETE RESTRICT ON UPDATE CASCADE;
