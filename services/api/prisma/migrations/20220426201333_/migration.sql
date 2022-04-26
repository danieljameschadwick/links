-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "styles" JSONB;

-- CreateTable
CREATE TABLE "LinkLogo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "LinkLogo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkLogo_linkId_key" ON "LinkLogo"("linkId");

-- AddForeignKey
ALTER TABLE "LinkLogo" ADD CONSTRAINT "LinkLogo_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
