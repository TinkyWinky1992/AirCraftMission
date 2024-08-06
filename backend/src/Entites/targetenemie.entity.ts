import { $Enums, Prisma } from "@prisma/client";

export class EnemyAircraftEntity implements Prisma.EnemyAircraftCreateInput {
    latitude: number;
    longitude: number;
    radius: number;
    speed: number;
    threatening: $Enums.ThreateningAirCraft;
    threatenedAircraft?:  Prisma.ThreatenedAircraftCreateNestedOneWithoutEnemyAircraftInput; // Adjusted type
    operations?: Prisma.OperationCreateNestedManyWithoutEnemyAircraftInput; // Adjusted type
}