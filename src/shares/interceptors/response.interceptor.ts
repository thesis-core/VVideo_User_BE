import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
    metadata: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                let metadata = { timestamp: new Date() };
                if (data) {
                    metadata = {
                        ...data.metadata,
                        timestamp: new Date(),
                    };
                    delete data?.metadata;
                }
                return {
                    code: context.switchToHttp().getResponse().statusCode,
                    data: data?.data || data,
                    metadata: metadata,
                    message: data?.message,
                };
            }),
        );
    }
}
