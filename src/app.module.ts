import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodMenuModule } from './food-menu/food-menu.module';
import {Food} from './food-menu/food.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      database: process.env.DB_HOST, // the name of the database
      entities: [Food],
      synchronize: true,
    }),
    FoodMenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
