import { ResponseMessage } from './../http';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: Logger = new Logger();

  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    try {
      // fetch args
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const message =
        exception instanceof HttpException
          ? exception.getResponse().toString()
          : 'Internal server error';
      this.logger.error({ request, err: exception, args });
      response.status(status).json(new ResponseMessage(-1, message));
    } catch (err: unknown) {
      super.catch(exception, host);
    }
  }
}
