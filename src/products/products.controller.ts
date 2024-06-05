import {
  Controller,
  Param,
  Body,
  Get,
  Delete,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

// @UseInterceptors(LoggerInterceptor)
@Controller('products')
export class ProductsController {
  // this.productsService = productsService;  typescript feature - empty constructor {} creates all parameters listed in constructor args
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    // Jeśli Nest zauważy, że próbujemy jako response zwrócić Promise, to zwyczajnie poczeka na jego wykonanie i jako response zwróci jego wynik. Nawet jeśli więc samo pobieranie danych chwilę potrwa, to NestJS na nie poczeka i zwróci je jako odpowiedź dopiero kiedy będą gotowe.
    // Dotyczy to tylko return
    return this.productsService.getAll();
  }

  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }

  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    // Powiedzieliśmy wcześniej, że w return bez problemu możemy umieścić Promise, bo NestJS w takiej sytuacji po prostu na niego poczeka. Taka wspaniałomyślność tyczy się jednak tylko return. Jeśli taki Promise pojawi się w kodzie wcześniej, to JS na niego nie poczeka.
    // Na szczęście możemy łatwo to zrealizować. Wystarczy użyć składni async/await.
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found'); // error handling https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    return prod;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    // DTO - data object model in /src/products/dtos/create-product.dto.ts
    return this.productsService.create(productData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productsService.updateById(id, productData);
    return { success: true };
  }
}

/*  DTO (Data Object Model) - 
        w request otrzymujemy w body tablicę cech produktu do ogarniecia 
        NestJS
        rekomenduje, aby tworzyć specjalne oddzielne struktury opisujące dane otrzymywane w
        przypadku requestu do dodawania elementu, usuwania itd

        pipes - https://docs.nestjs.com/pipes
*/
