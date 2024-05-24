import { Injectable } from '@nestjs/common';
import { db, Order } from './../db/db';


@Injectable()
export class OrdersService {
    getAll(): Order[] {
        return db.orders;
    }

    getById(id: Order['id']): Order | null {
        return db.orders.find(o => o.id === id);
    }
}
