-- CreateTable
CREATE TABLE "Uncompleted" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Uncompleted_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Uncompleted" ADD CONSTRAINT "Uncompleted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
