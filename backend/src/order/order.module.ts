import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Films } from '../films/entity/film.entity';
import {
  FilmsTypeOrmRepository,
  REPOSITORY_TOKEN,
} from '../repository/films.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: REPOSITORY_TOKEN,
      useClass: FilmsTypeOrmRepository,
    },
  ],
})
export class OrderModule {}
