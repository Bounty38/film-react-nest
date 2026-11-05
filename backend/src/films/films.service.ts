import { Injectable } from '@nestjs/common';
import { MongoFilmsRepository } from '../repository/mongo-films.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: MongoFilmsRepository) {}

  async findAll(): Promise<FilmsResponseDto> {
    const items = await this.filmsRepository.findAll();
    return { total: items.length, items };
  }

  async findSchedule(id: string): Promise<ScheduleResponseDto> {
    const items = await this.filmsRepository.findSchedule(id);
    return { total: items.length, items };
  }
}
