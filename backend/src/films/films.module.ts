import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FilmsTypeOrmRepository,
  REPOSITORY_TOKEN,
} from '../repository/films.repository';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Films } from './entity/film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Films])],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    {
      provide: REPOSITORY_TOKEN,
      useClass: FilmsTypeOrmRepository,
    },
  ],
  exports: [REPOSITORY_TOKEN],
})
export class FilmsModule {}
