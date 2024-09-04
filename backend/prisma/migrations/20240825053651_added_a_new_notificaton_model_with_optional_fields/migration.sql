-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "comments_notification" DROP NOT NULL,
ALTER COLUMN "post_upload" DROP NOT NULL,
ALTER COLUMN "like" DROP NOT NULL,
ALTER COLUMN "share" DROP NOT NULL;
