//import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  productId: string;

  //  @IsNotEmpty()
  //  @IsString()
  // @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  //  address: string;
}
