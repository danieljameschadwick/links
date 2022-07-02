-- AlterTable
CREATE SEQUENCE "link_displayorder_seq";
ALTER TABLE "Link" ALTER COLUMN "displayOrder" SET DEFAULT nextval('link_displayorder_seq');
ALTER SEQUENCE "link_displayorder_seq" OWNED BY "Link"."displayOrder";
