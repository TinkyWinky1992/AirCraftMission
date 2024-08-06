/*
  Warnings:

  - A unique constraint covering the columns `[enemyAircraftId]` on the table `ThreatenedAircraft` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_threatenedAircraftId_fkey";

-- AlterTable
ALTER TABLE "Operation" ALTER COLUMN "threatenedAircraftId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ThreatenedAircraft_enemyAircraftId_key" ON "ThreatenedAircraft"("enemyAircraftId");

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_threatenedAircraftId_fkey" FOREIGN KEY ("threatenedAircraftId") REFERENCES "ThreatenedAircraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
