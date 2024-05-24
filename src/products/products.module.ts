import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}


/* Tablica providers w pliku całego modułu wyraźnie ustala, że instancja naszego serwisu
powinna być dostępna w controllerze. Tym samym na 100%, konstruktor naszego controllera
otrzymuje takową instancję. Wystarczy, że ją odbierzemy i dla wygody przypiszemy do jakiejś
właściwości.
*/