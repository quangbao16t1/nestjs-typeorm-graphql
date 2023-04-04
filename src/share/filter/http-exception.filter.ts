import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonLogger } from '../common/logger/common.logger';
import { AxiosError } from 'axios';
import { get } from 'lodash';
import { ILog } from '../common/logger/log.interface';
import { error_code } from '../common/error-code.const';
import { error_message } from '../common/app.const';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new CommonLogger('HttpExceptionFilter');

  private getStatus = (exception: HttpException | AxiosError) => {
    return exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
  };

  private getCode = (exception: HttpException | AxiosError) => {
    return exception instanceof HttpException && exception.getResponse()['code']
        ? exception.getResponse()['code']
        : error_code.COMMON_SYSTEM_ERROR;
  };

  private getMessage = (exception: HttpException | AxiosError): string => {
    const status = this.getStatus(exception);

    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      const errors = this.getErrors(exception);
      return Object.values(get(errors, '[0].constraints')).shift() as string;
    }

    return exception?.message || error_message.ERROR_MESSAGE_DEFAULT_SYSTEM;
  };

  private getErrors = (exception: HttpException | AxiosError) => {
    return exception instanceof HttpException
        ? exception.getResponse()['errors']
        : Object.assign(
            { data: (exception as any)?.response?.data },
            (exception as any)?.toJSON?.(),
        );
  };

  catch(exception: HttpException | AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    const message = this.getMessage(exception);
    const errors = this.getErrors(exception);
    const code = this.getCode(exception);

    if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
      const thisLog: ILog = {
        endpoint: request.path,
        ipAddress:
            request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress,
        method: request.method,
        error: exception as any,
      };
      this.logger.customError(message, exception.stack, thisLog);
    }

    if (exception instanceof HttpException) this.logger.log(JSON.stringify(exception.getResponse()));

    response.status(status).json({
      message,
      code,
      errors,
      statusCode: status,
    });
  }
}