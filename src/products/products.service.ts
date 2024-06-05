import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {} // Od tej chwili serwis Prismy będzie już dostępny w całym serwisie produktów pod właściwością this.prismaService

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  public getAllExtended(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: { orders: true },
    });
  }

  public getExtendedById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: { orders: true },
    });
  }

  public deleteById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }

  // in shared/service/prisma models id createAt updateAt are managed by prisma decorators @default(uuid()). No need to add them here since anyway will be overriten
  public create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  /*
    data: {
    name: productData.name,
    description: productData.description,
    price: productData.price,
  }
  */

  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }
}

/*
Prisma sama tworzy interfejsy naszych danych na podstawie modeli! Są one udostępniane w wygenerowanej przez Prismę paczce @prisma/client. 
Interfejs Product możemy więc zaimportować od razu z tej paczki. Nie musimy tworzyć go sami.

import { Product } from '@prisma/client';

*/

/*
Paczka @prisma/client jest generowana od nowa każdorazowo, kiedy tylko zmienimy strukturę naszych danych. 
Zawsze generuje się więc ona ze stałym zestawem wbudowanych metod, ale też dodatkowo z interfejsami, które są przygotowywane na podstawie modeli. 
Stąd w naszym przypadku ta paczka udostępnia teraz interfejsy Product i Order. 
Gdybyśmy jednak usunęli te modele z pliku schema.prisma i od nowa odpalili komendę npx prisma db push, to paczka ta byłaby wygenerowana od nowa i w nowym wydaniu już by ich nie udostępniała.
*/

/*Czy skoro teraz zamiast tablicy produktów zwracamy Promise, to czy nie powinniśmy czasem zmodyfikować również controllera? await?

Nie musimy się o to martwić. Jeśli Nest zauważy, że próbujemy jako response zwrócić Promise, to zwyczajnie poczeka na jego wykonanie i jako response zwróci jego wynik. 
Nawet jeśli więc samo pobieranie danych chwilę potrwa, to NestJS na nie poczeka i zwróci je jako odpowiedź dopiero kiedy będą gotowe.

 To tyczy się jednak tylko return. Jeśli taki Promise pojawi się w kodzie wcześniej, to JS na niego nie poczeka.
*/
