import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({ summary: 'Список фильмов, доступных на этой неделе' })
  @ApiOkResponse({ type: FilmsResponseDto })
  getFilms(): Promise<FilmsResponseDto> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  @ApiOperation({ summary: 'Расписание сеансов выбранного фильма' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'Идентификатор фильма',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @ApiOkResponse({ type: ScheduleResponseDto })
  getFilmSchedule(@Param('id') id: string): Promise<ScheduleResponseDto> {
    return this.filmsService.findSchedule(id);
  }
}
