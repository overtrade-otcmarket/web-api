import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { getDetailPoolDto, GetListPoolDto } from '../dto/pool-request.dto';
import { PoolService } from '../service/pool.service';

@ApiTags('pool') // put the name of the controller in swagger
@Controller('pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Get('list-pool')
  getListPool(@Query() query: GetListPoolDto) {
    return this.poolService.getListPool(query);
  }

  @Get('detail-pool')
  getDetailPool(@Query() query: getDetailPoolDto) {
    return this.poolService.getDetailPool(query);
  }
}
