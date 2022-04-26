/*
  Warnings:

  - Made the column `url` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "url" SET NOT NULL;
