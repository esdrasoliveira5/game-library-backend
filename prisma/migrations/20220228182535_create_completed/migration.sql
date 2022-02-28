-- CreateTable
CREATE TABLE "Completed" (
    "id" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Completed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Completed" ADD CONSTRAINT "Completed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
