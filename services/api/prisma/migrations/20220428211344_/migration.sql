/*
  Warnings:

  - You are about to drop the column `profileId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_profileId_fkey";

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "profileId",
ADD COLUMN     "userProfileId" INTEGER;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
