import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Building } from 'src/repository/building/building.entity';

export class BuildingDTO implements Building {
  buildingID: number;
  buildingName: string;
  buildingCode: string;
}

export class CreateBuildingDTO implements Omit<Building, 'buildingID'> {
  @IsString()
  @ApiProperty()
  buildingName: string;
  @IsString()
  @ApiProperty()
  buildingCode: string;
}

export class UpdateBuildingDTO implements Omit<Building, 'buildingID'> {
  @IsString()
  @ApiProperty()
  buildingName: string;
  @IsString()
  @ApiProperty()
  buildingCode: string;
}
