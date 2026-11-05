import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FilmsService } from './films.service';
import { FilmsResponseDto } from './dto/films.dto';
import { ScheduleResponseDto } from '../schedule/dto/schedule.dto';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  @ApiOperation({ summary: 'Список фильмов, доступных на этой неделе' })
  @ApiOkResponse({ type: FilmsResponseDto })
  findAll() {
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
  @ApiNotFoundResponse({ description: 'Фильм не найден' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.filmsService.findOne(id);
  }
}
