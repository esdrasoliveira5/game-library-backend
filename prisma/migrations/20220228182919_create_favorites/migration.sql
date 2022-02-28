-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "favoritesId" TEXT;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
