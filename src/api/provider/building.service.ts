import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BuildingRepo } from 'src/repository';
import { Building } from 'src/repository/building/building.entity';
import { BuildingDTO, UpdateBuildingDTO } from '../dto/building.dto';
import { CreateBuildingDTO } from '../dto';

@Injectable()
export class BuildingService {
  private readonly logger = new Logger(BuildingService.name);
  constructor(
    @Inject(BuildingRepo)
    private buildingRepo: BuildingRepo,
  ) {}

  public async create(data: CreateBuildingDTO): Promise<BuildingDTO> {
    return await this.buildingRepo.create(data);
  }

  public async get(buildingID: number): Promise<Building | null> {
    const building = await this.buildingRepo.findOne(buildingID);
    this.logger.verbose(`Building: ${JSON.stringify(building)}`);
    return building;
  }

  public async getAll(): Promise<Building[]> {
    return await this.buildingRepo.findAll();
  }

  public async update(
    buildingID: number,
    data: UpdateBuildingDTO,
  ): Promise<BuildingDTO> {
    // check existed
    const building = await this.buildingRepo.findOne(buildingID);
    if (!building) {
      throw new NotFoundException('cannot found building');
    }

    building.buildingCode = data.buildingCode;
    building.buildingName = data.buildingName;
    return await this.buildingRepo.update(data);
  }

  public async remove(buildingID: number): Promise<void> {
    const building = await this.buildingRepo.findOne(buildingID);
    if (!building) {
      throw new NotFoundException('cannot found building');
    }

    const deleteResult = await this.buildingRepo.remove(buildingID);
    if (!deleteResult.affected) {
      this.logger.warn(
        `building ${buildingID} is not found or already deleted`,
      );
    }
  }
}
