/*
  Warnings:

  - The primary key for the `Comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_pkey",
ADD CONSTRAINT "Comments_pkey" PRIMARY KEY ("user_id", "post_id");

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("user_id", "post_id");
