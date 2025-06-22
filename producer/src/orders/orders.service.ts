import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './orders.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class OrdersService {
      constructor(@Inject("ORDER_SERVICE") private rabbitClient: ClientProxy) {}
      placeOrder(order: OrderDto) {
            this.rabbitClient.emit("order-placed", order)
            return {message: "order placed"}
      }

      getOrders() {
            return this.rabbitClient
                  .send({cmd: "fetch-orders"}, {})
                  .pipe(timeout(5000)) //how long the producer should wait for the consumer response
      }
}
