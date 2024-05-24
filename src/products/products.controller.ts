import { Controller, Param, Body, Get, Delete, Post, Put, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
    // this.productsService = productsService;  typescript feature - empty constructor {} creates all parameters listed in constructor args
    constructor(private productsService: ProductsService) {}

    @Get('/')
    getAll(): any {
        return this.productsService.getAll();
    }

    @Get('/:id')
    getById(@Param('id', new ParseUUIDPipe()) id: string): any {
        const prod = this.productsService.getById(id);
        if (!prod) throw new NotFoundException('Product not found')     // error handling https://docs.nestjs.com/exception-filters#built-in-http-exceptions
        return prod;
    }

    @Delete('/:id')
    deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!this.productsService.getById(id))
            throw new NotFoundException('Product not found')
        this.productsService.deleteById(id);
        return { success: true };
    }

    @Post('/')
    create(@Body() productData: CreateProductDTO) {                           // DTO
        return this.productsService.create(productData);
    }

    @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() productData: UpdateProductDTO,
    ) {
        if (!this.productsService.getById(id))
            throw new NotFoundException('Product not found')

        this.productsService.updateById(id, productData);
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
