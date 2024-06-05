import { Transform } from 'class-transformer';
import { IsString, Length, IsNotEmpty, IsInt, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
  description: string;
}

/* teraz, kiedy TS zauważy, że body ma spełniać wymagania klasy
CreateProductDTO , to z automatu przy requeście sprawdzi, czy faktycznie tak jest i jeśli nie
będzie, to wyrzuci błąd
*/
