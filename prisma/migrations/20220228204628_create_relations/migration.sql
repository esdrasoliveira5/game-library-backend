/*
  Warnings:

  - Made the column `userId` on table `Completed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gamesId` on table `Completed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gamesId` on table `Favorites` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Uncompleted` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gamesId` on table `Uncompleted` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Completed" DROP CONSTRAINT "Completed_gamesId_fkey";

-- DropForeignKey
ALTER TABLE "Completed" DROP CONSTRAINT "Completed_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_gamesId_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_userId_fkey";

-- DropForeignKey
ALTER TABLE "Uncompleted" DROP CONSTRAINT "Uncompleted_gamesId_fkey";

-- DropForeignKey
ALTER TABLE "Uncompleted" DROP CONSTRAINT "Uncompleted_userId_fkey";

-- AlterTable
ALTER TABLE "Completed" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "gamesId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Favorites" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "gamesId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Uncompleted" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "gamesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Completed" ADD CONSTRAINT "Completed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Completed" ADD CONSTRAINT "Completed_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uncompleted" ADD CONSTRAINT "Uncompleted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uncompleted" ADD CONSTRAINT "Uncompleted_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
