import { Injectable } from '@nestjs/common';
import { TargetCoordinateDto, FreindlyAircraft } from 'src/Dto';
import { calculateDistance, convertTimeToString } from './utils';
@Injectable()
export class AppService {
  constructor() {

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

  async ClosestPlane(aircraft: FreindlyAircraft[], coordinates: TargetCoordinateDto, radius: number): Promise<FreindlyAircraft> {
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

}


