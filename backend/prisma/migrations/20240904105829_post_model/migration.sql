/*
  Warnings:

  - You are about to drop the column `data` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Content` table. All the data in the column will be lost.
  - Added the required column `blocks` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "data",
DROP COLUMN "type",
ADD COLUMN     "blocks" JSONB NOT NULL;
