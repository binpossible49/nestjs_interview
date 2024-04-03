import { ResponseMessage } from 'src/common/http';
import { CreateNewLocationDTO, LocationDTO, UpdateLocationDTO } from '../dto';
import { LocationService } from '../provider';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';

@Controller('buildings')
export class LocationController {
  constructor(private service: LocationService) {}

  @Get(':buildingID/levels/:levelID/locations/:locationID')
  public async get(
    @Param('locationID', ParseIntPipe) locationID: number,
  ): Promise<ResponseMessage<LocationDTO>> {
    const result = await this.service.get(locationID);
    if (!result) {
      return new ResponseMessage(-1, 'Not Found');
    }
    return new ResponseMessage(0, 'OK', result);
  }

  @Get(':buildingID/levels/:levelID/locations')
  public async getAll(
    @Param('levelID', ParseIntPipe) levelID: number,
  ): Promise<ResponseMessage<LocationDTO[]>> {
    const result = await this.service.getAllLocationsByLevel(levelID);
    if (!result) {
      return new ResponseMessage(-1, 'Not Found');
    }
    return new ResponseMessage(0, 'OK', result);
  }

  @Post(':buildingID/levels/:levelID/locations')
  public async create(
    @Param('levelID', ParseIntPipe) levelID: number,
    @Body() body: CreateNewLocationDTO,
  ): Promise<ResponseMessage<LocationDTO>> {
    try {
      const result = await this.service.create(levelID, body);
      if (!result.levelID) {
        return new ResponseMessage(-1, 'NotCreatedData');
      }
      return new ResponseMessage(0, 'OK', result);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }

  @Put(':buildingID/levels/:levelID/locations/:locationsID')
  public async update(
    @Param('locationsID', ParseIntPipe) locationsID: number,
    @Body() body: UpdateLocationDTO,
  ): Promise<ResponseMessage<void>> {
    try {
      await this.service.update(locationsID, body);
      return new ResponseMessage(0, 'OK', null);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }

  @Delete(':buildingID/levels/:levelID/locations/:locationsID')
  public async remove(
    @Param('locationsID', ParseIntPipe) locationsID: number,
  ): Promise<ResponseMessage<void>> {
    try {
      await this.service.remove(locationsID);
      return new ResponseMessage(0, 'OK');
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message);
    }
  }
}
