import { Building } from './building.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BuildingRepo {
  constructor(
    @InjectRepository(Building)
    private buildingsRepository: Repository<Building>,
  ) {}

  findAll(): Promise<Building[]> {
    return this.buildingsRepository.find();
  }

  findOne(buildingID: number): Promise<Building | null> {
    return this.buildingsRepository.findOneBy({ buildingID: buildingID });
  }
  create(data: Partial<Building>): Promise<Building> {
    return this.buildingsRepository.save(data);
  }

  update(data: Partial<Building>): Promise<Building> {
    return this.buildingsRepository.save(data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.buildingsRepository.delete(id);
  }
}
