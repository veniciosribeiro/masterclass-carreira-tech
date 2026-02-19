-- AlterTable
ALTER TABLE "test_results" ADD COLUMN "session_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "test_results_session_id_key" ON "test_results"("session_id");
