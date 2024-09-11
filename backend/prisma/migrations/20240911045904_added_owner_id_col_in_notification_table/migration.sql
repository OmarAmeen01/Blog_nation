/*
  Warnings:

  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `owner_id` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
ADD COLUMN     "owner_id" TEXT NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id", "owner_id");
