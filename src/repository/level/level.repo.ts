import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Level } from './level.entity';

@Injectable()
export class LevelRepo {
  constructor(
    @InjectRepository(Level)
    private levelsRepository: Repository<Level>,
  ) {}

  findAll(): Promise<Level[]> {
    return this.levelsRepository.find();
  }

  findOne(levelID: number): Promise<Level | null> {
    return this.levelsRepository.findOneBy({ levelID: levelID });
  }
  findByBuildingLevel(
    buildingID: number,
    levelID: number,
  ): Promise<Level | null> {
    return this.levelsRepository.findOneBy({ levelID, buildingID });
  }

  findByBuildingID(buildingID: number): Promise<Level[]> {
    return this.levelsRepository.findBy({ buildingID });
  }

  create(data: Partial<Level>): Promise<Level> {
    return this.levelsRepository.save(data);
  }

  update(data: Partial<Level>): Promise<Level> {
    return this.levelsRepository.save(data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.levelsRepository.delete(id);
  }
}
