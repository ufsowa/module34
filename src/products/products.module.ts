import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}

/* Tablica providers w pliku całego modułu wyraźnie ustala, że instancja naszego serwisu
powinna być dostępna w controllerze. Tym samym na 100%, konstruktor naszego controllera
otrzymuje takową instancję. Wystarczy, że ją odbierzemy i dla wygody przypiszemy do jakiejś
właściwości.
*/

/* mechanism dependency injegtion - providers - PrismaService będzie udostępnione nie tylko w controllerze, ale również w serwisie ProductsService

 to oznacza tylko tyle, że NestJS udostępni nam w ProductsService instancję PrismaService
 NestJS przekazuje instancję danego serwisu jako argument do konstruktora
 Jeśli więc chcemy korzystać z danego serwisu w controllerze, wystarczy przypisać sobie ten argument do jakiejś właściwości, żeby potem przy jej użyciu mieć dostęp do tego serwisu w całej klasie

 NestJS udostępni nam w konstruktorze ProductsService instancję PrismaService, to wystarczy ją odebrać i od razu przypisać do właściwości.

 constructor(private prismaService: PrismaService) {}
*/
