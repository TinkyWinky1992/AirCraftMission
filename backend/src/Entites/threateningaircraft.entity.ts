import { Prisma } from "@prisma/client";
import { OperationEntity } from "./operation.entity";
import { EnemyAircraftEntity } from "./targetenemie.entity";


export class ThreateningAirCraftEntity implements Prisma.ThreatenedAircraftCreateInput {
    latitude: number;
    longitude: number;
    speed: number;
    enemyAircraft: Prisma.EnemyAircraftCreateNestedOneWithoutThreatenedAircraftInput;
    operations: Prisma.OperationCreateNestedManyWithoutThreatenedAircraftInput;
}