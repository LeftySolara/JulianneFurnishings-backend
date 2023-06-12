-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(22) NULL,
    `hashedPassword` CHAR(60) NOT NULL,
    `emailAddress` VARCHAR(128) NOT NULL,
    `firstName` VARCHAR(45) NOT NULL,
    `lastName` VARCHAR(45) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `uuid_UNIQUE`(`uuid`),
    UNIQUE INDEX `User_slug_key`(`slug`),
    UNIQUE INDEX `emailAddress_UNIQUE`(`emailAddress`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
