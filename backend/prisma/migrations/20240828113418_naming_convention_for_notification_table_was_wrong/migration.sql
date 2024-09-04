/*
  Warnings:

  - You are about to drop the column `comments_notification` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `post_upload` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `share` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "comments_notification",
DROP COLUMN "like",
DROP COLUMN "post_upload",
DROP COLUMN "share",
ADD COLUMN     "comments" BOOLEAN,
ADD COLUMN     "likes" BOOLEAN,
ADD COLUMN     "post_uploads" BOOLEAN,
ADD COLUMN     "shares" BOOLEAN;
