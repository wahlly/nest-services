import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderDto } from './order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("order-placed")
  handleOrderPlaced(@Payload() data: OrderDto) {
    return this.appService.handleOrderPlaced(data);
  }

  @MessagePattern({cmd: "fetch-orders"})
  getOrders(@Ctx() context: RmqContext) {
    console.log(context.getMessage) //accessing the properties of the rabbitmq message using context
    return this.appService.getOrders()
  }
}
