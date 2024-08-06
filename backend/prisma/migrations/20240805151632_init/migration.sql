-- CreateEnum
CREATE TYPE "ThreateningAirCraft" AS ENUM ('WITH_THREATENING', 'NON_THREATENING');

-- CreateTable
CREATE TABLE "EnemyAircraft" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT  NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "threatening" "ThreateningAirCraft" NOT NULL,

    CONSTRAINT "EnemyAircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThreatenedAircraft" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL,
    "enemyAircraftId" INTEGER NOT NULL,

    CONSTRAINT "ThreatenedAircraft_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreatenedAircraft" ADD CONSTRAINT "ThreatenedAircraft_enemyAircraftId_fkey" FOREIGN KEY ("enemyAircraftId") REFERENCES "EnemyAircraft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
