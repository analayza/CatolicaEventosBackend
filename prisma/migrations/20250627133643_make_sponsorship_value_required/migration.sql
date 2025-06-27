/*
  Warnings:

  - Made the column `sponsorship_value` on table `EventSponsor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EventSponsor" ALTER COLUMN "sponsorship_value" SET NOT NULL;
