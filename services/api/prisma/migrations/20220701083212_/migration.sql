/*
  Warnings:

  - A unique constraint covering the columns `[userProfileId,displayOrder]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Made the column `displayOrder` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "displayOrder" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userProfileId_displayOrder" ON "Link"("userProfileId", "displayOrder");
