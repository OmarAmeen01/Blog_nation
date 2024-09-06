/*
  Warnings:

  - You are about to drop the column `data` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "data",
DROP COLUMN "description",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id","post_id")
);

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
