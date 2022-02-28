/*
  Warnings:

  - The primary key for the `Games` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Games" DROP CONSTRAINT "Games_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Games_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Games_id_seq";

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
