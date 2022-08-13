import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {NewMealEvent} from '../events/new.meal.event'



@Injectable()
export class NotificationsService {

    @OnEvent('new.meal')
    async notifyUser (payload: NewMealEvent) {
        console.log(`Hello user, ${payload.name} has been added to our menu. Enjoy.`)
    }
}
