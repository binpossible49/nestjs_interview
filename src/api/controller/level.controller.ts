import { ResponseMessage } from 'src/common/http';
import { CreateNewLevelDTO, LevelDTO, UpdateLevelDTO } from '../dto';
import { LevelService } from '../provider';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('buildings')
export class LevelController {
  constructor(private service: LevelService) {}

  @Get('/:buildingID/levels/:levelID')
  public async get(
    @Param('buildingID', ParseIntPipe) buildingID: number,
    @Param('levelID', ParseIntPipe) levelID: number,
  ): Promise<ResponseMessage<LevelDTO>> {
    const result = await this.service.getByBuildingLevel(buildingID, levelID);
    if (!result) {
      return new ResponseMessage(-1, 'Not Found');
    }
    return new ResponseMessage(0, 'OK', result);
  }

  @Get('/:buildingID/levels/')
  public async getLevelForBuilding(
    @Param('buildingID', ParseIntPipe) buildingID: number,
  ): Promise<ResponseMessage<LevelDTO[]>> {
    const result = await this.service.getByBuilding(buildingID);
    if (!result) {
      return new ResponseMessage(-1, 'Not Found');
    }
    return new ResponseMessage(0, 'OK', result);
  }

  @Post('/:buildingID/levels/')
  public async create(
    @Param('buildingID', ParseIntPipe) buildingID: number,
    @Body() body: CreateNewLevelDTO,
  ): Promise<ResponseMessage<LevelDTO>> {
    try {
      const result = await this.service.create(buildingID, body);
      if (!result.levelID) {
        return new ResponseMessage(-1, 'NotCreatedData');
      }

      return new ResponseMessage(0, 'OK', result);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }

  @Put('/:buildingID/levels/:levelID')
  public async update(
    @Param('buildingID', ParseIntPipe) buildingID: number,
    @Param('levelID', ParseIntPipe) levelID: number,
    @Body() body: UpdateLevelDTO,
  ): Promise<ResponseMessage<void>> {
    try {
      await this.service.update(levelID, buildingID, body);
      return new ResponseMessage(0, 'OK', null);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }

  @Delete('/:buildingID/levels/:levelID')
  public async remove(
    @Param('buildingID', ParseIntPipe) buildingID: number,
    @Param('levelID', ParseIntPipe) levelID: number,
  ): Promise<ResponseMessage<void>> {
    try {
      // todo cascade
      await this.service.remove(levelID, buildingID);
      return new ResponseMessage(0, 'OK', null);
    } catch (ex: any) {
      return new ResponseMessage(-1, ex.message, null);
    }
  }
}
