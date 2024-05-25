import { Injectable } from '@nestjs/common';
import { db, Order } from './../db/db';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';


@Injectable()
export class OrdersService {

    getAll(): Order[] {
        return db.orders;
    }

    getById(id: Order['id']): Order | null {
        return db.orders.find(o => o.id === id);
    }

    create(orderData: Omit<Order, 'id'>): Order {
        const newOrder = { ...orderData, id: uuidv4() };
        db.orders.push(newOrder);
        return newOrder;
    }

    updateById(id: Order['id'], orderData: Omit<Order, 'id'>) {
        db.orders = db.orders.map(p => {
            if (p.id === id) {
                return {...p, ...orderData};
            } else {
                return p;
            }
        })
    }

    deleteById(id: Order['id']) {
        db.orders = db.orders.filter((p) => p.id !== id);
    }

}
