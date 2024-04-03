import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LevelRepo, LocationRepo, Location } from 'src/repository';

import {
  CreateNewLocationDTO,
  LevelDTO,
  LocationDTO,
  UpdateLocationDTO,
} from '../dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);
  constructor(
    @Inject(LevelRepo)
    private levelRepo: LevelRepo,
    @Inject(LocationRepo)
    private locationRepo: LocationRepo,
  ) {}

  public async create(
    levelID: number,
    data: CreateNewLocationDTO,
  ): Promise<LocationDTO> {
    const level = await this.levelRepo.findOne(levelID);
    if (!level) {
      throw new NotFoundException('not found level');
    }

    // check parent location exist and available area
    if (data.parentLocationID) {
      const parentLocation = await this.locationRepo.findOne(
        data.parentLocationID,
      );
      if (!parentLocation) {
        throw new NotFoundException('not found parent level');
      }

      const availableArea = await this.getAvailableAreaForLocation(
        data.parentLocationID,
        parentLocation,
      );

      if (!availableArea || availableArea < data.area) {
        throw new NotFoundException('not enough available area');
      }
    }

    const locationData: Omit<Location, 'locationID'> = {
      levelID: levelID,
      locationName: data.locationName,
      locationCode: data.locationCode,
      parentLocationID: data.parentLocationID,
      area: data.area,
    };
    if (!locationData.parentLocationID) {
      delete locationData.parentLocationID;
    }

    return await this.locationRepo.create(locationData);
  }

  private async getAvailableAreaForLocation(
    locationID: number,
    location?: Location,
  ): Promise<number> {
    if (!location) {
      location = await this.locationRepo.findOne(locationID);
      if (!location) {
        throw new NotFoundException('not found location');
      }
    }

    const locations =
      await this.locationRepo.findAllLocationOfLevel(locationID);
    if (!locations || !locations.length) {
      return location.area;
    }

    const totalUsedArea = locations.reduce<number>(
      (l, c) => l + (location.locationID === c.parentLocationID && c.area) || 0,
      0,
    );
    return location.area - totalUsedArea;
  }

  public async get(locationID: number): Promise<LocationDTO | null> {
    const level = await this.locationRepo.findOne(locationID);
    return level;
  }

  public async getAllLocationsByLevel(
    levelID: number,
  ): Promise<LocationDTO[] | null> {
    const locations = await this.locationRepo.findAllLocationOfLevel(levelID);
    return locations;
  }
  public async getByBuilding(buildingID: number): Promise<LevelDTO[]> {
    const levels = await this.levelRepo.findByBuildingID(buildingID);
    return levels;
  }

  public async getAll(): Promise<LevelDTO[]> {
    return await this.levelRepo.findAll();
  }

  public async update(
    locationID: number,
    data: UpdateLocationDTO,
  ): Promise<LocationDTO> {
    // check existed

    const location = await this.locationRepo.findOne(locationID);
    if (!location) {
      throw new NotFoundException('cannot found location');
    }

    if (location.parentLocationID) {
      const parentLocation = await this.locationRepo.findOne(
        location.parentLocationID,
      );
      if (!parentLocation) {
        throw new NotFoundException('not found parent level');
      }

      const availableArea = await this.getAvailableAreaForLocation(
        location.parentLocationID,
        parentLocation,
      );

      if (!availableArea || availableArea < data.area) {
        throw new NotFoundException('not enough available area');
      }
    }

    location.area = data.area;
    location.locationCode = data.locationCode;
    location.locationName = data.locationName;

    return await this.locationRepo.update(location);
  }

  public async remove(locationID: number): Promise<void> {
    const level = await this.locationRepo.findOne(locationID);
    if (!level) {
      throw new NotFoundException('cannot found location');
    }

    const deleteResult = await this.locationRepo.remove(locationID);
    if (!deleteResult.affected) {
      this.logger.warn(`level ${locationID} is not found or already deleted`);
    }
  }
}
