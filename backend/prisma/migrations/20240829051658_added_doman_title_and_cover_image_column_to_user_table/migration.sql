/*
  Warnings:

  - You are about to drop the column `catagory` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "catagory",
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "domain_title" TEXT;
