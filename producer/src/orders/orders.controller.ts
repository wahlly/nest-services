import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post("place-order")
  placeOrder(@Body() order: OrderDto) {
    return this.ordersService.placeOrder(order)
  }
}
