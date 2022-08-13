import { Controller, Post, Body, Get } from '@nestjs/common';
import {FoodMenuService} from './food-menu.service'
import {CreateMenuItemDto} from './dtos/createMenuItem.dto'

@Controller('food-menu')
export class FoodMenuController {
    constructor(
        private foodMenuService: FoodMenuService
    ) {}

    @Post()
    async createMenuItem ( @Body() body: CreateMenuItemDto ) {
        return this.foodMenuService.createMenuItem(body.name, body.price)
    }

    @Get()
    async getMenuItems () {
        return this.foodMenuService.getMenuItems()
    }
}
