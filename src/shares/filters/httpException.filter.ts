import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        // eslint-disable-next-line
        const exceptionResponse: any = exception.getResponse();
        response.status(status).json({
            code: exceptionResponse?.code || status,
            timestamp: new Date().toISOString(),
            message: exceptionResponse?.message || 'Unknown',
            path: request.url,
        });
    }
}
