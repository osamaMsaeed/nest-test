import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

function _prepareBadRequestValidationErrors(errors) {
  let Errors: any = {};
  for (const err of errors) {
    const constraint =
      err.constraints &&
      Object.values(err.constraints) &&
      Object.values(err.constraints).length &&
      Object.values(err.constraints)[0];
    Errors[err.property] = constraint
      ? constraint
      : `${err.property} is invalid`;
  }
  return Errors;
}

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    if (!(exception instanceof HttpException)) {
      let ResponseToSend = {
        message: 'Something went wrong',
      };
      response.__ss_body = ResponseToSend;
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseToSend);
      return;
    }
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    if (
      exception instanceof BadRequestException &&
      exceptionResponse.message &&
      Array.isArray(exceptionResponse.message)
    ) {
      let ResponseToSend = {
        message: 'Bad request',
        errors: _prepareBadRequestValidationErrors(exceptionResponse.message),
      };
      response.__ss_body = ResponseToSend;
      response.status(status).json(ResponseToSend);
    } else {
      let ResponseToSend = {
        message: exceptionResponse.key || 'Unidentified error occurred',
        data: exceptionResponse?.data || undefined,
        error:
          !exceptionResponse?.key && exceptionResponse.message
            ? exceptionResponse.message
            : undefined,
      };
      response.__ss_body = ResponseToSend;
      response.status(status).json(ResponseToSend);
    }
  }
}
