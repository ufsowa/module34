import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import * as cors from 'cors';

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}


//https://github.com/ufsowa/module34

/* W funkcji apply podajemy middleware, którego chcemy użyć. Możemy podać kilka,
oddzielając je przecinkiem.

Metoda forRoutes służy do zdeniowania, dla jakich adresów i metod chcemy używać tego
middleware

W forRoutes możemy także podać nazwę konkretnego controllera, jeśli chcemy
zastosować middleware jedynie dla niego.
.forRoutes(ProductsController)

*/