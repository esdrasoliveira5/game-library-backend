/*
  Warnings:

  - You are about to drop the `_CompletedToGames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesToGames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GamesToUncompleted` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompletedToGames" DROP CONSTRAINT "_CompletedToGames_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompletedToGames" DROP CONSTRAINT "_CompletedToGames_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToGames" DROP CONSTRAINT "_FavoritesToGames_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToGames" DROP CONSTRAINT "_FavoritesToGames_B_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToUncompleted" DROP CONSTRAINT "_GamesToUncompleted_A_fkey";

-- DropForeignKey
ALTER TABLE "_GamesToUncompleted" DROP CONSTRAINT "_GamesToUncompleted_B_fkey";

-- AlterTable
ALTER TABLE "Completed" ADD COLUMN     "gamesId" TEXT;

-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "gamesId" TEXT;

-- AlterTable
ALTER TABLE "Uncompleted" ADD COLUMN     "gamesId" TEXT;

-- DropTable
DROP TABLE "_CompletedToGames";

-- DropTable
DROP TABLE "_FavoritesToGames";

-- DropTable
DROP TABLE "_GamesToUncompleted";

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Completed" ADD CONSTRAINT "Completed_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uncompleted" ADD CONSTRAINT "Uncompleted_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;
