import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodMenuModule } from './food-menu/food-menu.module';
import {Food} from './food-menu/food.entity'
import { NotificationsModule } from './notifications/notifications.module';
import {EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: process.env.NODE_ENV == "production"? process.env.RDS_HOSTNAME : process.env.DB_HOST,
      port: process.env.NODE_ENV == "production"? parseInt(process.env.RDS_PORT) : parseInt(process.env.DB_PORT),
      database: process.env.NODE_ENV == "production"? process.env.RDS_DB_NAME : process.env.DB_NAME, // the name of the database
      username: process.env.NODE_ENV == "production"? process.env.RDS_USERNAME : process.env.DB_USERNAME,
      password: process.env.NODE_ENV == "production"? process.env.RDS_PASSWORD : process.env.DB_PASSWORD,
      entities: [Food],
      synchronize: true,
    }),
    FoodMenuModule,
    NotificationsModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
