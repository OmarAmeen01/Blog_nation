-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_post_id_fkey";

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
