import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class CronjobsService {

    constructor( private schedulerRegistry: SchedulerRegistry ) {}

    @Cron( '0 * * * * *' )
    openForBusiness()  {
        console.log("Delicious cakes is open for business...")
        const takingOrdersJob = this.schedulerRegistry.getCronJob('takingOrders')
        takingOrdersJob.start()
    }

    @Cron( CronExpression.EVERY_5_SECONDS, {name: "takingOrders"} )
    takingOrders() {
        console.log("Delicious cakes is still taking orders")
    }

    @Cron('40,45 * * * * *')
    closingSoon() {
        console.log("Delicious cakes will be closing soon")
    }

    @Cron( '50 * * * * *' )
    closed() {
        const takingOrdersJob = this.schedulerRegistry.getCronJob('takingOrders')
        takingOrdersJob.stop()
        console.log("Delicious cakes is closed for the day")
        console.log("")
    }
}
