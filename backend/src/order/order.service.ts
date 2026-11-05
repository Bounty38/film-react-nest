import { Inject, Injectable } from '@nestjs/common';
import {
  FilmsRepository,
  REPOSITORY_TOKEN,
} from '../repository/films.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject(REPOSITORY_TOKEN)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  create(order: CreateOrderDto) {
    return this.filmsRepository.createOrder(order);
  }
}
