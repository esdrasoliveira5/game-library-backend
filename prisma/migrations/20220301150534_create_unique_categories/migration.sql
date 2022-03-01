/*
  Warnings:

  - Added the required column `userId` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoriesId` on table `Collections` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Collections" DROP CONSTRAINT "Collections_categoriesId_fkey";

-- DropIndex
DROP INDEX "Categories_name_key";

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Collections" ALTER COLUMN "categoriesId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
