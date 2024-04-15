import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingRepo } from './building/building.repo';
import { LocationRepo } from './location/location.repo';
import { LevelRepo } from './level/level.repo';
import { Building } from './building/building.entity';
import { Level } from './level/level.entity';
import { Location } from './location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Building, Level, Location])],
  providers: [BuildingRepo, LocationRepo, LevelRepo],
  exports: [BuildingRepo, LocationRepo, LevelRepo],
})
export class RepositoryModule {}
