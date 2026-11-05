import { Inject, Injectable } from '@nestjs/common';
import {
  FilmsRepository,
  REPOSITORY_TOKEN,
} from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(REPOSITORY_TOKEN)
    private readonly filmsRepository: FilmsRepository,
  ) {}

  findAll() {
    return this.filmsRepository.findAll();
  }

  findOne(id: string) {
    return this.filmsRepository.findOne(id);
  }
}
