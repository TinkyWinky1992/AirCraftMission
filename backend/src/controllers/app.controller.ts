import { Controller, Get, Query } from '@nestjs/common';
import { TargetCoordinateDto, FreindlyAircraft } from 'src/Dto';
import { AppService } from 'src/service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('timer')
  getTimer(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('targetLat') targetLat: number,
    @Query('targetLng') targetLng: number,
    @Query('speed') speed: number,
    @Query('radius') maxFlightRadius: number
  ): Promise<string> {
    const coordinate: TargetCoordinateDto = { lat: targetLat, lng: targetLng, speed, maxFlightRadius };
    return this.appService.getTimer(lat, lng, coordinate);
  }

  @Get('nearbyplane')
  getNearPlane(
    @Query('aircraft')aircraft: FreindlyAircraft[], 
    @Query('coordinates') coordinates: TargetCoordinateDto, 
    @Query('radius') radius: number): Promise<FreindlyAircraft>{

    return this.appService.ClosestPlane(aircraft, coordinates, radius)
  }

}