import { FilmDto, ScheduleDto } from '../films/dto/films.dto';
import { FilmDocument } from '../films/schemas/film.schema';

export interface FilmsRepository {
  findAll(): Promise<FilmDto[]>;
  findSchedule(filmId: string): Promise<ScheduleDto[]>;
  findById(filmId: string): Promise<FilmDocument | null>;
  reserveSeat(
    filmId: string,
    sessionId: string,
    seatKey: string,
  ): Promise<boolean>;
}
