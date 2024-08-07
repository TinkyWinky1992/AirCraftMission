-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_enemyAircraftId_fkey";

-- AlterTable
ALTER TABLE "Operation" ALTER COLUMN "enemyAircraftId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_enemyAircraftId_fkey" FOREIGN KEY ("enemyAircraftId") REFERENCES "EnemyAircraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
