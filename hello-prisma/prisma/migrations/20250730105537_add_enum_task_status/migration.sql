/*
  Warnings:

  - The `taskStatus` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Not_Started', 'IN_PROGRESS', 'COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskStatus",
ADD COLUMN     "taskStatus" "TaskStatus" NOT NULL DEFAULT 'Not_Started';
