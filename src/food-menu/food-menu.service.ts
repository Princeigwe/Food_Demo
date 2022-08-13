import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { Food } from './food.entity';

@Injectable()
export class FoodMenuService {
    constructor(
        @InjectRepository(Food) private foodRepo: Repository<Food>
    ) {}

    async createMenuItem (name: string, price: number) {
        const food = this.foodRepo.create({name, price})
        await this.foodRepo.save(food)
        return food
    }

    async getMenuItems () {
        return this.foodRepo.find()
    }
}
