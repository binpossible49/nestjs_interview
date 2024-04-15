import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Location } from 'src/repository/location/location.entity';

export class LocationDTO implements Location {
  locationID: number;
  parentLocationID?: number;
  levelID: number;
  locationName: string;
  locationCode: string;
  area: number;
}

export class CreateNewLocationDTO
  implements Omit<Location, 'locationID' | 'levelID'>
{
  @IsNumber()
  @ApiProperty()
  parentLocationID?: number;

  @IsString()
  @ApiProperty()
  @MinLength(1)
  locationName: string;
  @IsString()
  @ApiProperty()
  @MinLength(1)
  locationCode: string;
  @IsNumber()
  @ApiProperty()
  @Min(1)
  area: number;
}

export class UpdateLocationDTO
  implements Omit<Location, 'locationID' | 'levelID'>
{
  @IsString()
  @ApiProperty()
  @MinLength(1)
  locationName: string;
  @IsString()
  @ApiProperty()
  @MinLength(1)
  locationCode: string;
  @IsNumber()
  @ApiProperty()
  @Min(1)
  area: number;
}
