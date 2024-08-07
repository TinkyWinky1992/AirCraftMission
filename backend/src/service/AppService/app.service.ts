import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { TargetCoordinateDto, FriendlyAircraftDto, SaveOperationDto } from 'src/Dto';
import { calculateDistance, convertTimeToString } from './utils';
import { Operation, EnemyAircraft, ThreatenedAircraft , Prisma } from '@prisma/client';
import { EnemyAircraftEntity, OperationEntity } from 'src/Entites';
import { PrismaClient, ThreateningAirCraft } from '@prisma/client';
@Injectable()
export class AppService {
  constructor(private  prisma: PrismaService) {

  }



  async saveOperation(operation: SaveOperationDto) {
    // Create enemy aircraft
    const enemyAircraft = await this.prisma.enemyAircraft.create({
      data: {
        latitude: operation.EnemyCoordinates.lat,
        longitude: operation.EnemyCoordinates.lng,
        radius: operation.EnemyCoordinates.maxFlightRadius,
        speed: operation.EnemyCoordinates.speed,
        threatening: operation.FriendlyAirCraft 
          ? ThreateningAirCraft.WITH_THREATENING 
          : ThreateningAirCraft.NON_THREATENING,
      },
    });
  
    // Initialize threatenedAircraftId as null
    let threatenedAircraftId: number | null = null;
  
    // Create threatened aircraft only if FriendlyAirCraft is present
    if (operation.FriendlyAirCraft) {
      const threatenedAircraft = await this.prisma.threatenedAircraft.create({
        data: {
          latitude: operation.FriendlyAirCraft.latitude,
          longitude: operation.FriendlyAirCraft.longitude,
          speed: operation.FriendlyAirCraft.velocity,
          enemyAircraftId: enemyAircraft.id,
        },
      });
      threatenedAircraftId = threatenedAircraft.id;
    }
  
    
    const createdOperation = await this.prisma.operation.create({
      data: {
        dateTime: new Date(),
        enemyAircraftId: enemyAircraft.id,
        threatenedAircraftId: threatenedAircraftId || null, 
      },
    });
  
    console.log('Created Operation:', createdOperation);
  
    return createdOperation;
  }

  async getAllData() {

      const ThreatenedAirCrafts = await this.prisma.threatenedAircraft.findMany()
      const EnemyAirCrafts = await this.prisma.enemyAircraft.findMany()
      const Operations = await this.prisma.operation.findMany()
      return {ThreatenedAirCrafts, EnemyAirCrafts , Operations}
  }


  async getTimer (log: number, lng: number, coordinates: TargetCoordinateDto ) {
    
    if (!coordinates || coordinates.lat === undefined || coordinates.lng === undefined || coordinates.speed === undefined) {
      
      console.error("Coordinates are not available.");
      return "Coordinates are not available.";
    }
  
    const currentLat = coordinates.lat;
    const currentLng = coordinates.lng;
    const speedKmH = coordinates.speed;
  
    // Convert speed from km/h to m/s
    const speedMS = speedKmH * (1000 / 3600);
  
    const distance = calculateDistance(currentLat, currentLng, log, lng);
    const timeRemainingSeconds = distance / speedMS;
  
    
    return convertTimeToString(timeRemainingSeconds);
    
  }

  getHello(): string {
    return 'Hello World!';
  }

  async ClosestPlane(aircraft: FriendlyAircraftDto[], coordinates: TargetCoordinateDto, radius: number): Promise<FriendlyAircraftDto> {
    const { lat: fireLat, lng: fireLng } = coordinates;
  
    if (!fireLat || !fireLng) {
      return null;
    }
  
    const withinRadius = aircraft.filter(plane => {
      const distance = calculateDistance(fireLat, fireLng, plane.latitude, plane.longitude);
      return distance <= radius;
    });
  
    const closestPlane = withinRadius.reduce((closest, plane) => {
      const distance = calculateDistance(fireLat, fireLng, plane.latitude, plane.longitude);
  
      if (distance < closest.distance) {
        return { plane, distance };
      }
  
      return closest;
    }, { plane: null, distance: Infinity } as { plane: any | null, distance: number });
  
    return closestPlane.plane;
  };


  async deleteOperations(id: number): Promise<void> {
    const idAsNumber = +id;
    console.log(idAsNumber)
    console.log(typeof(idAsNumber))
    const operation = await this.prisma.operation.findUnique({
      where: { id: idAsNumber },
    });
  
    if (operation) {
      
      if (operation.threatenedAircraftId) {
        await this.prisma.threatenedAircraft.delete({
          where: { id: operation.threatenedAircraftId },
        });
      }
  
      // Ensure the EnemyAircraft is not being referenced by any other Operations
      if (operation.enemyAircraftId) {
        const relatedOperations = await this.prisma.operation.findMany({
          where: { enemyAircraftId: operation.enemyAircraftId },
        });
  
        if (relatedOperations.length === 1) { // Only the current operation is referencing this EnemyAircraft
          await this.prisma.enemyAircraft.delete({
            where: { id: operation.enemyAircraftId }
          });
        }
      }
  
    } else {
      console.warn(`Operation with ID ${id} not found`);
    }
  }
}
  


