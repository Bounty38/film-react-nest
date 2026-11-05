import { ApiProperty } from '@nestjs/swagger';

export class GetScheduleDTO {
  @ApiProperty({
    format: 'uuid',
    example: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
  })
  id: string;

  @ApiProperty({ format: 'date-time', example: '2023-05-29T10:30:00.001Z' })
  daytime: string;

  @ApiProperty({ example: '2' })
  hall: string;

  @ApiProperty({ example: 5 })
  rows: number;

  @ApiProperty({ example: 10 })
  seats: number;

  @ApiProperty({ example: 350 })
  price: number;

  @ApiProperty({ type: [String], example: ['1:2'] })
  taken: string[];
}

export class ScheduleResponseDto {
  @ApiProperty({ minimum: 0, example: 1 })
  total: number;

  @ApiProperty({ type: [GetScheduleDTO] })
  items: GetScheduleDTO[];
}
