/*
  Warnings:

  - You are about to drop the column `catagory` on the `Post` table. All the data in the column will be lost.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "catagory",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "data" JSONB NOT NULL;
