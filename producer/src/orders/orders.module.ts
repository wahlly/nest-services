import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
      ClientsModule.register([
        {
          name: "ORDER_SERVICE",
          transport: Transport.RMQ,
          options: {
            urls: ["amqp://localhost:5672"],
            queue: "orders_queue"
          }
        }
      ])
    ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
