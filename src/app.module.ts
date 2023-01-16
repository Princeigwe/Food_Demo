import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodMenuModule } from './food-menu/food-menu.module';
import {Food} from './food-menu/food.entity'
import { NotificationsModule } from './notifications/notifications.module';
import {EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.PORT),
      database: process.env.DB_NAME, // the name of the database
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Food],
      synchronize: true,
    }),
    FoodMenuModule,
    NotificationsModule,
    EventEmitterModule.forRoot(),
    CronjobsModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
