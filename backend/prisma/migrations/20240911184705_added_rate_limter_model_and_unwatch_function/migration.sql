/*
  Warnings:

  - You are about to drop the column `un_watched` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "un_watched";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "un_watched" INTEGER;
