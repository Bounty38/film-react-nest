import { ApiProperty } from '@nestjs/swagger';

export class GetFilmDto {
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

export class FilmsResponseDto {
  @ApiProperty({ minimum: 0, example: 1 })
  total: number;

  @ApiProperty({ type: [GetFilmDto] })
  items: GetFilmDto[];
}
