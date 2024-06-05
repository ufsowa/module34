import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

/*  Nasz serwis Prismy będzie dbał o tworzenie połączenia z bazą, ale musi też być w stanie takie połączenia przerwać.
Jeśli chcemy, aby Nest odpowiednio informował Prismę o takiej potrzebie, musimy dodać do konfigruacji Nesta linijkę 

app.enableShutdownHooks()


products.service.ts - jak zadbać o to, aby miał on dostęp do serwisu Prismy.
    wszystkie serwisy, które będą podane w tablicy providers danego modułu, będą udostępnione do controllera, ale też do innych serwisów tego modułu


*/
