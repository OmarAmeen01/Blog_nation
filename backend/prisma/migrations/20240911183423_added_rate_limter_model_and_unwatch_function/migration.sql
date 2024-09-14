-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "un_watched" INTEGER;

-- CreateTable
CREATE TABLE "RateLimiter" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "Requests" TEXT NOT NULL,

    CONSTRAINT "RateLimiter_pkey" PRIMARY KEY ("id","user_id")
);
