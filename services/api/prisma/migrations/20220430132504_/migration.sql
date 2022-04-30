/*
  Warnings:

  - You are about to drop the column `style` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "style";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "style";
