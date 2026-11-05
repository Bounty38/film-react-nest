import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: MongoFilmsRepository) {}

  async create(order: CreateOrderDto): Promise<OrderResponseDto> {
    const selected = new Set<string>();

    for (const ticket of order.tickets) {
      const film = await this.filmsRepository.findById(ticket.film);
      if (!film) {
        throw new BadRequestException('Фильм не найден');
      }

      const session = film.schedule.find((s) => s.id === ticket.session);
      if (!session) {
        throw new BadRequestException('Сеанс не найден');
      }

      if (ticket.row > session.rows || ticket.seat > session.seats) {
        throw new BadRequestException('Некорректный ряд или место');
      }

      if (ticket.price !== session.price) {
        throw new BadRequestException('Некорректная стоимость билета');
      }

      if (ticket.daytime !== session.daytime) {
        throw new BadRequestException('Некорректное время сеанса');
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      const uniqueKey = `${ticket.film}:${ticket.session}:${seatKey}`;
      if (selected.has(uniqueKey)) {
        throw new BadRequestException('Место выбрано дважды');
      }
      selected.add(uniqueKey);

      if (session.taken.includes(seatKey)) {
        throw new ConflictException('Место уже занято');
      }
    }

    return this.filmsRepository.createOrder(order);
  }
}
