import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationRepo {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  findOne(locationID: number): Promise<Location | null> {
    return this.locationsRepository.findOneBy({ locationID });
  }

  findAllChildren(locationID: number): Promise<Location[]> {
    return this.locationsRepository.findBy({ parentLocationID: locationID });
  }

  findAllLocationOfLevel(levelID: number): Promise<Location[]> {
    return this.locationsRepository.findBy({ levelID });
  }

  create(data: Partial<Location>): Promise<Location> {
    return this.locationsRepository.save(data);
  }

  update(data: Partial<Location>): Promise<Location> {
    return this.locationsRepository.save(data);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.locationsRepository.delete(id);
  }
}
