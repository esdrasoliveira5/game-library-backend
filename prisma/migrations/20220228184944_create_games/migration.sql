/*
  Warnings:

  - You are about to drop the column `completedId` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `favoritesId` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `uncompletedId` on the `Games` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_completedId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_favoritesId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_uncompletedId_fkey";

-- AlterTable
ALTER TABLE "Games" DROP COLUMN "completedId",
DROP COLUMN "favoritesId",
DROP COLUMN "uncompletedId";

-- CreateTable
CREATE TABLE "_FavoritesToGames" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CompletedToGames" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToUncompleted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToGames_AB_unique" ON "_FavoritesToGames"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToGames_B_index" ON "_FavoritesToGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CompletedToGames_AB_unique" ON "_CompletedToGames"("A", "B");

-- CreateIndex
CREATE INDEX "_CompletedToGames_B_index" ON "_CompletedToGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToUncompleted_AB_unique" ON "_GamesToUncompleted"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToUncompleted_B_index" ON "_GamesToUncompleted"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesToGames" ADD FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToGames" ADD FOREIGN KEY ("B") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletedToGames" ADD FOREIGN KEY ("A") REFERENCES "Completed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompletedToGames" ADD FOREIGN KEY ("B") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUncompleted" ADD FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUncompleted" ADD FOREIGN KEY ("B") REFERENCES "Uncompleted"("id") ON DELETE CASCADE ON UPDATE CASCADE;
