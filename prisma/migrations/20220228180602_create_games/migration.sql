-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "idGame" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_idGame_key" ON "Games"("idGame");
