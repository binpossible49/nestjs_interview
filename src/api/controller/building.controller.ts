import { ResponseMessage } from 'src/common/http';
import { BuildingDTO, CreateBuildingDTO, UpdateBuildingDTO } from '../dto';
import { BuildingService } from '../provider';
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  Body,
  InternalServerErrorException,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('buildings')
export class BuildingController {
  constructor(private service: BuildingService) {}

  @Get(':buildingID')
  public async get(
    @Param('buildingID', ParseIntPipe) buildingID: number,
  ): Promise<ResponseMessage<BuildingDTO>> {
    const result = await this.service.get(buildingID);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }
    return new ResponseMessage(0, 'OK', result);
  }

  @Get()
  public async getAll(): Promise<ResponseMessage<BuildingDTO[]>> {
    const result = await this.service.getAll();
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }
    return new ResponseMessage(0, 'OK', result);
  }

  @Post()
  public async create(
    @Body() body: CreateBuildingDTO,
  ): Promise<ResponseMessage<BuildingDTO>> {
    const result = await this.service.create(body);
    if (!result.buildingID) {
      throw new InternalServerErrorException('NotCreatedData');
    }

    return new ResponseMessage(0, 'OK', result);
  }

  @Put(':buildingID')
  public async update(
    @Param('buildingID', ParseIntPipe) id: number,
    @Body() body: UpdateBuildingDTO,
  ): Promise<ResponseMessage<void>> {
    try {
      await this.service.update(id, body);
      return new ResponseMessage(0, 'OK', null);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }

  @Delete(':buildingID')
  public async remove(
    @Param('buildingID', ParseIntPipe) buildingID: number,
  ): Promise<ResponseMessage<void>> {
    try {
      // todo cascade
      await this.service.remove(buildingID);
      return new ResponseMessage(0, 'OK', null);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }
}
