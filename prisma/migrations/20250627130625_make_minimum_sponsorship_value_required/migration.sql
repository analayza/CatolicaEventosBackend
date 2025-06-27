/*
  Warnings:

  - Made the column `minimum_sponsorship_value` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "minimum_sponsorship_value" SET NOT NULL;
