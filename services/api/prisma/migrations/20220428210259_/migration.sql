/*
  Warnings:

  - You are about to drop the column `heading` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subHeading` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "heading",
DROP COLUMN "subHeading";
