import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { DataSource, Repository } from 'typeorm';

import { GetFilmDto } from '../films/dto/films.dto';
import { Films } from '../films/entity/film.entity';
import { CreateOrderDto, OrderedTicketDto } from '../order/dto/order.dto';
import { GetScheduleDTO } from '../schedule/dto/schedule.dto';

export const REPOSITORY_TOKEN = 'REPOSITORY_TOKEN';

export type ListResponse<Type> = {
  total: number;
  items: Type[];
};

export interface FilmsRepository {
  findAll: () => Promise<ListResponse<GetFilmDto>>;
  findOne: (id: string) => Promise<ListResponse<GetScheduleDTO>>;
  createOrder: (
    order: CreateOrderDto,
  ) => Promise<ListResponse<OrderedTicketDto>>;
}

export class FilmsTypeOrmRepository implements FilmsRepository {
  constructor(
    @InjectRepository(Films)
    private readonly filmsRepository: Repository<Films>,
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: string): Promise<ListResponse<GetScheduleDTO>> {
    const film = await this.filmsRepository.findOne({
      where: { id },
      relations: { schedule: true },
      order: { schedule: { daytime: 'ASC' } },
    });
    if (film === null) {
      throw new NotFoundException('Film not Found');
    }
    return { total: film.schedule.length, items: film.schedule };
  }

  async findAll(): Promise<ListResponse<GetFilmDto>> {
    const films = await this.filmsRepository.find();

    return { total: films.length, items: films };
  }

  async createOrder({
    tickets,
  }: CreateOrderDto): Promise<ListResponse<OrderedTicketDto>> {
    const queryRunner = this.dataSource.createQueryRunner();
    const response: ListResponse<OrderedTicketDto> = { total: 0, items: [] };

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      for (const ticket of tickets) {
        const { film: id, row, seat, session } = ticket;
        const film = await queryRunner.manager.findOne(Films, {
          where: {
            id,
            schedule: { id: session },
          },
          relations: {
            schedule: true,
          },
        });
        if (film === null || film.schedule === null) {
          throw new NotFoundException('Film not Found');
        }
        const schedule = film.schedule[0];
        const place = `${row}:${seat}`;

        if (schedule.taken.includes(place)) {
          throw new BadRequestException('Место уже занято');
        }

        if (row > schedule.rows || seat > schedule.seats) {
          throw new BadRequestException('Некорректное место');
        }

        schedule.taken.push(place);
        await queryRunner.manager.save(schedule);
        response.items.push({
          ...ticket,
          id: randomUUID(),
        });
        response.total++;
      }

      await queryRunner.commitTransaction();
      return response;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
