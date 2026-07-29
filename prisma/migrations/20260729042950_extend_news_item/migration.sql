-- AlterTable
ALTER TABLE "NewsItem" ADD COLUMN     "description" TEXT,
ADD COLUMN     "publishedLabel" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'article';
