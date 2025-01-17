import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetOrdersByTokenDto,
  getAllActivityDto,
  getListOrderActivityDto,
  getListOrderDto,
} from '../dto/order-request.dto';
import { OrdersService } from '../services/orders.service';

@ApiTags('orders') // put the name of the controller in swagger
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('get-list/:tokenAddress')
  getOrdersByTokenAddress(
    @Param('tokenAddress') tokenAddress: string,
    @Query() query: GetOrdersByTokenDto,
  ) {
    return this.ordersService.getOrdersByTokenAddress(tokenAddress, query);
  }

  @Get('order-books')
  getOrderBooks(@Query() query: getListOrderDto) {
    return this.ordersService.getOrderBooks(query);
  }

  @Get('order-activity')
  getOrderActivity(@Query() query: getListOrderActivityDto) {
    return this.ordersService.getOrderActivity(query);
  }

  @Get('all-activity')
  getAllActivity(@Query() query: getAllActivityDto) {
    return this.ordersService.getAllActivity(query);
  }

  @Get('new-activity')
  getNewActivity() {
    return this.ordersService.getNewActivity();
  }
}
