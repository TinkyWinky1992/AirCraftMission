import { Prisma } from "@prisma/client";

export class OperationEntity implements Prisma.OperationCreateInput {
    dateTime: Date;
    enemyAircraft: Prisma.EnemyAircraftCreateNestedOneWithoutOperationsInput;
    threatenedAircraft: Prisma.ThreatenedAircraftCreateNestedOneWithoutOperationsInput;
}