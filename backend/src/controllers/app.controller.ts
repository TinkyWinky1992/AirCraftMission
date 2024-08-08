import { Controller, Get, Query, Post, Body, Delete, BadRequestException, NotFoundException} from '@nestjs/common';
import { TargetCoordinateDto, FriendlyAircraftDto, SaveOperationDto } from 'src/Dto';
import { AppService } from 'src/service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Get('/health')
  healthCheck(): string {
    return 'Backend is up and running';
  }

  
  @Get('getLine')
  async getLine(
    @Query('coordinate') coordinate:any, 
    @Query('endLat')endLat: number, 
    @Query('endLng')endLng:number) {
      const targetCoordinate: TargetCoordinateDto = {
        lat: coordinate.lat,
        lng: coordinate.lng,
        maxFlightRadius: coordinate.radius,
        speed: coordinate.speed,
    };
      return this.appService.getlineCoordinates(targetCoordinate, endLat, endLng);
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
  async getNearPlane(
    @Query('aircraft') aircraft: FriendlyAircraftDto[], 
    @Query('coordinates') coordinates: TargetCoordinateDto, 
    @Query('radius') radius: number
  ): Promise<FriendlyAircraftDto | null> {

  
    const closestPlane = await this.appService.ClosestPlane(aircraft, coordinates, radius);

  
    return closestPlane;
  }
  

  @Post('SaveOperation')
  SaveOperation(@Body() saveOperationDto: any) {
    console.log("hi", saveOperationDto);

    const operationDto = new SaveOperationDto();
    

    if (saveOperationDto.aircraft && saveOperationDto.aircraft.length > 0) {
      const aircraftData = saveOperationDto.aircraft[0];
      const friendlyAirCraft = new FriendlyAircraftDto();
      friendlyAirCraft.icao24 = aircraftData.icao24;
      friendlyAirCraft.callsign = aircraftData.callsign;
      friendlyAirCraft.latitude = parseFloat(aircraftData.latitude);
      friendlyAirCraft.longitude = parseFloat(aircraftData.longitude);
      friendlyAirCraft.velocity = parseFloat(aircraftData.velocity);
      operationDto.FriendlyAirCraft = friendlyAirCraft;
    } else {
      operationDto.FriendlyAirCraft = null;
    }
  
    
    if (saveOperationDto.coordinate) {
      const enemyCoordinates = new TargetCoordinateDto();
      enemyCoordinates.lat = parseFloat(saveOperationDto.coordinate.lat);
      enemyCoordinates.lng = parseFloat(saveOperationDto.coordinate.lng);
      enemyCoordinates.speed = parseFloat(saveOperationDto.coordinate.speed);
      enemyCoordinates.maxFlightRadius = parseFloat(saveOperationDto.coordinate.radius);
      operationDto.EnemyCoordinates = enemyCoordinates;
    } else {
      operationDto.EnemyCoordinates = null;
    }
  

    if (saveOperationDto.dateTime) {
      operationDto.DateTime = new Date(saveOperationDto.dateTime);
    } else {
      throw new Error('DateTime is required');
    }
  
    return this.appService.saveOperation(operationDto);
  }

  @Get('AllOperations')
  getOperations(){
    return this.appService.getAllData()
  }

  @Delete('delete')
  async deleteOperationsDetails(@Query('ids') id:number){
    this.appService.deleteOperations(id);
  }

  


}