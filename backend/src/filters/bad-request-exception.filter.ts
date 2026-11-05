import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const body = exception.getResponse();
    const message =
      typeof body === 'object' && 'message' in body
        ? body.message
        : exception.message;

    host.switchToHttp().getResponse<Response>().status(status).json({
      error: message,
    });
  }
}
