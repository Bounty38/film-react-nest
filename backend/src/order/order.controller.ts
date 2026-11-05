import { Body, Controller, HttpCode, Post, UseFilters } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestExceptionFilter } from '../filters/bad-request-exception.filter';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@UseFilters(BadRequestExceptionFilter)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @HttpCode(200)
  @Post()
  @ApiOperation({ summary: 'Купить билеты' })
  @ApiOkResponse({ type: OrderResponseDto })
  @ApiBadRequestResponse({
    description: 'Некорректный запрос или место занято',
  })
  @ApiNotFoundResponse({ description: 'Фильм или сеанс не найден' })
  create(@Body() orders: CreateOrderDto) {
    return this.orderService.create(orders);
  }
}
