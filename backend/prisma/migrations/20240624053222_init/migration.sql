/*
  Warnings:

  - Added the required column `imgUrl` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "imgUrl" TEXT NOT NULL;
