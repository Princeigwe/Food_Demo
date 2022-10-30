import { Controller, Post, Body, Get, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {FoodMenuService} from './food-menu.service'
import {CreateMenuItemDto} from './dtos/createMenuItem.dto'

@Controller('food-menu')
export class FoodMenuController {
    constructor(
        private foodMenuService: FoodMenuService
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createMenuItem ( @Body() body: CreateMenuItemDto, @UploadedFile() file: Express.Multer.File ) {
        if( !file.originalname.match( /\.(jpg|png|jpeg)$/) ) {
            throw new HttpException('File must be an image', HttpStatus.BAD_REQUEST)
        }
        return this.foodMenuService.createMenuItem(body.name, body.price, file.originalname, file.buffer)
    }

    @Get()
    async getMenuItems () {
        return this.foodMenuService.getMenuItems()
    }
}
