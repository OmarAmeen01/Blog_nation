/*
  Warnings:

  - Added the required column `catagory` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "catagory" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "catagory" TEXT;
