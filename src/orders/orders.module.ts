import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Orders } from './orders';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  providers: [Orders, OrdersService]
})
export class OrdersModule {}
