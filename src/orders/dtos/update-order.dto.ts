import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class UpdateOrderDTO {

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    client: string;

    @IsNotEmpty()
    @IsUUID()
    productId: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => (Array.isArray(value) ? value.join(', ') : ''))
    address: string;
}