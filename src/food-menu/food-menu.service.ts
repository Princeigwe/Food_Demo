import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { Food } from './food.entity';
import {NewMealEvent} from '../events/new.meal.event'
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class FoodMenuService {
    constructor(
        @InjectRepository(Food) private foodRepo: Repository<Food>,
        private eventEmitter: EventEmitter2
    ) {}

    async createMenuItem (name: string, price: number) {
        const food = this.foodRepo.create({name, price})
        await this.foodRepo.save(food)

        this.eventEmitter.emit('new.meal', new NewMealEvent(food.name))
        return food
    }

    async getMenuItems () {
        return this.foodRepo.find()
    }
}
