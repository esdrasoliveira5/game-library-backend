-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "completedId" TEXT,
ADD COLUMN     "uncompletedId" TEXT;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_completedId_fkey" FOREIGN KEY ("completedId") REFERENCES "Completed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_uncompletedId_fkey" FOREIGN KEY ("uncompletedId") REFERENCES "Uncompleted"("id") ON DELETE SET NULL ON UPDATE CASCADE;
