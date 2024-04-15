import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BuildingRepo, LevelRepo } from 'src/repository';

import { CreateNewLevelDTO, LevelDTO, UpdateLevelDTO } from '../dto';
import { Level } from 'src/repository/level/level.entity';

@Injectable()
export class LevelService {
  private readonly logger = new Logger(LevelService.name);
  constructor(
    @Inject(LevelRepo)
    private levelRepo: LevelRepo,
    @Inject(BuildingRepo)
    private buildingRepo: BuildingRepo,
  ) {}

  public async create(
    buildingID: number,
    data: CreateNewLevelDTO,
  ): Promise<LevelDTO> {
    const building = await this.buildingRepo.findOne(buildingID);
    if (!building) {
      throw new NotFoundException('not found building');
    }
    const levelData: Omit<Level, 'levelID'> = {
      buildingID,
      levelCode: data.levelCode,
      levelName: data.levelName,
    };
    return await this.levelRepo.create(levelData);
  }

  public async get(levelID: number): Promise<LevelDTO | null> {
    const level = await this.levelRepo.findOne(levelID);
    return level;
  }

  public async getByBuildingLevel(
    buildingID: number,
    levelID: number,
  ): Promise<LevelDTO | null> {
    const level = await this.levelRepo.findByBuildingLevel(buildingID, levelID);
    return level;
  }
  public async getByBuilding(buildingID: number): Promise<LevelDTO[]> {
    const levels = await this.levelRepo.findByBuildingID(buildingID);
    return levels;
  }

  public async getAll(): Promise<LevelDTO[]> {
    return await this.levelRepo.findAll();
  }

  public async update(
    levelID: number,
    buildingID: number,
    data: UpdateLevelDTO,
  ): Promise<LevelDTO> {
    // check existed

    const level = await this.levelRepo.findByBuildingLevel(buildingID, levelID);
    if (!level) {
      throw new NotFoundException('cannot found level');
    }

    level.levelCode = data.levelCode;
    level.levelName = data.levelName;
    return await this.levelRepo.update(data);
  }

  public async remove(levelID: number, buildingNumber?: number): Promise<void> {
    const level = await this.levelRepo.findOne(levelID);
    if (!level) {
      throw new NotFoundException('cannot found level');
    }
    if (buildingNumber != 0 && level.buildingID != buildingNumber) {
      throw new NotFoundException('incorect level');
    }

    const deleteResult = await this.levelRepo.remove(levelID);
    if (!deleteResult.affected) {
      this.logger.warn(`level ${levelID} is not found or already deleted`);
    }
  }
}
