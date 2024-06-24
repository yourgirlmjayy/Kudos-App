/*
  Warnings:

  - You are about to drop the column `Description` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "Description",
ADD COLUMN     "description" TEXT;
