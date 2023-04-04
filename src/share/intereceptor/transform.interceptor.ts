import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommonLogger } from '../common/logger/common.logger';

export interface Response<T> { data: T }

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const logger = new CommonLogger('RESPONSE');
    const request = context.switchToHttp().getRequest();

    // Special case for download file, do not map data.
    if (String(request.url).includes('affiliate-audit') && request.method === 'GET') return next.handle();

    return next.handle().pipe(tap((data) => logger.log(`${JSON.stringify(data)}`))).pipe(
        map((data) => ({
          data,
          statusCode: HttpStatus.OK,
        })),
    );
  }
}
