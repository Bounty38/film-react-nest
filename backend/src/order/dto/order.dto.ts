import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class TicketDto {
  @ApiProperty({
    format: 'uuid',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  film: string;

  @ApiProperty({
    format: 'uuid',
    example: '95ab4a20-9555-4a06-bfac-184b8c53fe70',
  })
  @IsUUID()
  session: string;

  @ApiProperty({ format: 'date-time', example: '2023-05-29T10:30:00.001Z' })
  @IsDateString()
  daytime: string;

  @ApiProperty({ minimum: 1, example: 2 })
  @IsInt()
  @Min(1)
  row: number;

  @ApiProperty({ minimum: 1, example: 5 })
  @IsInt()
  @Min(1)
  seat: number;

  @ApiProperty({ minimum: 0, example: 350 })
  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'test@test.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+7 (000) 000-00-00' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: [TicketDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

export class OrderedTicketDto extends TicketDto {
  @ApiProperty({ format: 'uuid' })
  id: string;
}

export class OrderResponseDto {
  @ApiProperty({ minimum: 0, example: 2 })
  total: number;

  @ApiProperty({ type: [OrderedTicketDto] })
  items: OrderedTicketDto[];
}
