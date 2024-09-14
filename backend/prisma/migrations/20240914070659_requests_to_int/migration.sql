/*
  Warnings:

  - Changed the type of `Requests` on the `RateLimiter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RateLimiter" DROP COLUMN "Requests",
ADD COLUMN     "Requests" INTEGER NOT NULL;
