import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { BuildingService, LevelService, LocationService } from './provider';
import {
  BuildingController,
  LevelController,
  LocationController,
} from './controller';

@Module({
  imports: [RepositoryModule],
  controllers: [BuildingController, LevelController, LocationController],
  providers: [BuildingService, LevelService, LocationService],
})
export class ApiModule {}
