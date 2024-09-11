/*
  Warnings:

  - Added the required column `msg` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "msg" TEXT NOT NULL;
