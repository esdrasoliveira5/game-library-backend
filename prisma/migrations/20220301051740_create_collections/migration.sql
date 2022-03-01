-- CreateTable
CREATE TABLE "Collections" (
    "userId" TEXT NOT NULL,
    "gamesId" INTEGER NOT NULL,
    "categoriesId" INTEGER,

    CONSTRAINT "Collections_pkey" PRIMARY KEY ("userId","gamesId")
);

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collections" ADD CONSTRAINT "Collections_gamesId_fkey" FOREIGN KEY ("gamesId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
