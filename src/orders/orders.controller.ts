import { Controller, Param, Get, ParseUUIDPipe, NotFoundException, Post, Body, Delete, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/db/db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get('/')
    getAll(): Order[] {
        return this.ordersService.getAll();
    }

    @Get('/:id')
    getById(@Param('id', new ParseUUIDPipe()) id: string): Order | null {
        const order = this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    @Post('/')
    create(@Body() orderData: CreateOrderDTO): Order {
        return this.ordersService.create(orderData);
    }

    @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() orderData: UpdateOrderDTO
    ) {
        const order = this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');   
        this.ordersService.updateById(id, orderData);
        return { success: true };
    }

    @Delete('/:id')
    deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');

        this.ordersService.deleteById(id);
        return { success: true };
    }
}
