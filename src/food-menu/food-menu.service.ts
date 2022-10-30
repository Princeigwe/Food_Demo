import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { Food } from './food.entity';
import {NewMealEvent} from '../events/new.meal.event'
import { EventEmitter2 } from '@nestjs/event-emitter';
import {S3} from  'aws-sdk'

@Injectable()
export class FoodMenuService {
    constructor(
        @InjectRepository(Food) private foodRepo: Repository<Food>,
        private eventEmitter: EventEmitter2
    ) {}

    async uploadImageToS3(body: Buffer, filename: string) {
        const bucket = process.env.FOOD_DEMO_S3_BUCKET
        const s3 = new S3()
        const params = {Bucket: bucket, Key: filename, Body: body}
        return s3.upload(params).promise()
    }

    async createMenuItem (name: string, price: number, imageName: string, body: Buffer) {

        const imageLocation = (await this.uploadImageToS3(body, imageName)).Location

        const food = this.foodRepo.create({'name': name, 'price': price, 'image': imageLocation})
        await this.foodRepo.save(food)

        this.eventEmitter.emit('new.meal', new NewMealEvent(food.name))
        return food
    }

    async getMenuItems () {
        return this.foodRepo.find()
    }
}
