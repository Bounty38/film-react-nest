import { ApiProperty } from '@nestjs/swagger';

export class FilmDto {
  @ApiProperty({
    format: 'uuid',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id: string;

  @ApiProperty({ example: 2.9 })
  rating: number;

  @ApiProperty({ example: 'Итан Райт' })
  director: string;

  @ApiProperty({ type: [String], example: ['Документальный'] })
  tags: string[];

  @ApiProperty({ example: 'Архитекторы общества' })
  title: string;

  @ApiProperty({ example: 'Документальный фильм об ИИ и обществе.' })
  about: string;

  @ApiProperty({ example: 'Подробное описание фильма.' })
  description: string;

  @ApiProperty({ example: '/bg1s.jpg' })
  image: string;

  @ApiProperty({ example: '/bg1c.jpg' })
  cover: string;
}

export class ScheduleDto {
  @ApiProperty({
    format: 'uuid',
    example: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
  })
  id: string;

  @ApiProperty({ format: 'date-time', example: '2023-05-29T10:30:00.001Z' })
  daytime: string;

  @ApiProperty({ example: 2 })
  hall: number;

  @ApiProperty({ example: 5 })
  rows: number;

  @ApiProperty({ example: 10 })
  seats: number;

  @ApiProperty({ example: 350 })
  price: number;

  @ApiProperty({ type: [String], example: ['1:2'] })
  taken: string[];
}

export class FilmsResponseDto {
  @ApiProperty({ minimum: 0, example: 1 })
  total: number;

  @ApiProperty({ type: [FilmDto] })
  items: FilmDto[];
}

export class ScheduleResponseDto {
  @ApiProperty({ minimum: 0, example: 1 })
  total: number;

  @ApiProperty({ type: [ScheduleDto] })
  items: ScheduleDto[];
}
