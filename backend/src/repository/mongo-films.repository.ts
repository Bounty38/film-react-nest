import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Film, FilmDocument } from '../films/schemas/film.schema';
import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { FilmsRepository } from './films.repository';

@Injectable()
export class MongoFilmsRepository implements FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async findAll(): Promise<FilmDto[]> {
    return this.filmModel.find().select('-_id -__v -schedule').lean().exec();
  }

  async findById(filmId: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id: filmId }).exec();
  }

  async findSchedule(filmId: string): Promise<ScheduleDto[]> {
    const film = await this.filmModel
      .findOne({ id: filmId })
      .select('schedule')
      .lean()
      .exec();

    return film ? film.schedule : [];
  }

  // Атомарно занимает место: обновление сработает, только если место свободно.
  async reserveSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<boolean> {
    const result = await this.filmModel.updateOne(
      {
        id: filmId,
        schedule: { $elemMatch: { id: sessionId, taken: { $ne: seatKey } } },
      },
      { $addToSet: { 'schedule.$.taken': seatKey } },
    );
    return result.modifiedCount === 1;
  }
}
