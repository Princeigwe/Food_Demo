import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    async notifyUser () {
        console.log("Hello user, a new meal has been added to our menu. Enjoy.")
    }
}
