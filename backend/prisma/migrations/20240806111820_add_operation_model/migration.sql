-- CreateTable
CREATE TABLE "Operation" (
    "id" SERIAL NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enemyAircraftId" INTEGER NOT NULL,
    "threatenedAircraftId" INTEGER NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_enemyAircraftId_fkey" FOREIGN KEY ("enemyAircraftId") REFERENCES "EnemyAircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_threatenedAircraftId_fkey" FOREIGN KEY ("threatenedAircraftId") REFERENCES "ThreatenedAircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
