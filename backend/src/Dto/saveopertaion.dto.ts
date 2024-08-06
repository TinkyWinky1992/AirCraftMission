
import { FriendlyAircraftDto } from './friendlycoordinate.dto';
import { TargetCoordinateDto } from './targetcoordinate.dto';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, ValidateNested } from 'class-validator';

export class SaveOperationDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => FriendlyAircraftDto)
  FriendlyAirCraft?: FriendlyAircraftDto;
  
  @IsOptional()
  @ValidateNested()
  @Type(() => TargetCoordinateDto)
  EnemyCoordinates?: TargetCoordinateDto;

  @IsDate()
  @Type(() => Date)
  DateTime: Date;
}

