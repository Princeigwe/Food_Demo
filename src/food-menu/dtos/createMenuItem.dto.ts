import {IsString, IsNotEmpty, IsNumber} from 'class-validator'

export class CreateMenuItemDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number
}