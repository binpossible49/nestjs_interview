import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { Level } from 'src/repository/level/level.entity';

export class LevelDTO implements Level {
  levelID: number;
  buildingID: number;
  levelName: string;
  levelCode: string;
}

export class CreateNewLevelDTO implements Omit<Level, 'levelID'> {
  buildingID: number;
  @IsString()
  @ApiProperty()
  @MinLength(1)
  levelName: string;
  @IsString()
  @ApiProperty()
  @MinLength(1)
  levelCode: string;
}

export class UpdateLevelDTO implements Omit<Level, 'levelID'> {
  @IsNumber()
  @Min(1)
  @ApiProperty()
  buildingID: number;
  @IsString()
  @ApiProperty()
  @MinLength(1)
  levelName: string;
  @IsString()
  @ApiProperty()
  @MinLength(1)
  levelCode: string;
}
