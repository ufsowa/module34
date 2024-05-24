import { Controller, Param, Body, Get, Delete, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
    // this.productsService = productsService;  typescript feature - empty constructor {} creates all parameters listed in constructor args
    constructor(private productsService: ProductsService) {}

    @Get('/')
    getAll(): any {
        return this.productsService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: string): any {
        return this.productsService.getById(id);
    }

    @Delete('/:id')
    deleteById(@Param('id') id: string) {
        this.productsService.deleteById(id);
        return { success: true };
    }

    @Post('/')
    create(@Body() productData: CreateProductDTO) {                           // DTO
        return this.productsService.create(productData);
    }

}

/*  DTO (Data Object Model) - 
        w request otrzymujemy w body tablicę cech produktu do ogarniecia 
        NestJS
        rekomenduje, aby tworzyć specjalne oddzielne struktury opisujące dane otrzymywane w
        przypadku requestu do dodawania elementu, usuwania itd
*/
