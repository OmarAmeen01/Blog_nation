/*
  Warnings:

  - You are about to drop the column `comments` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `post_uploads` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `shares` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "comments",
DROP COLUMN "likes",
DROP COLUMN "post_uploads",
DROP COLUMN "shares",
ADD COLUMN     "comment_id" TEXT,
ADD COLUMN     "like_id" TEXT,
ADD COLUMN     "post_id" TEXT,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comments" BOOLEAN,
    "post_uploads" BOOLEAN,
    "likes" BOOLEAN,
    "shares" BOOLEAN,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comments_id_key" ON "Comments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_id_key" ON "Likes"("id");

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_like_id_fkey" FOREIGN KEY ("like_id") REFERENCES "Likes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
