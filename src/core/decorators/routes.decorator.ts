import { applyDecorators, HttpStatus, Get as NestGet } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  BadRequestExceptionResponse,
  FatalErrorExceptionResponse,
  ForbiddenExceptionResponse,
  NotFoundExceptionResponse,
  UnauthorizedExceptionResponse,
} from '../response/response.schema';

type RouteDecoratorsType = {
  path: string;
  response: Function | any;
  description: string;
};

export function Get(args: RouteDecoratorsType) {
  return applyDecorators(
    ApiResponse({
      type: args.response,
      status: HttpStatus.OK,
    }),
    ApiResponse({
      type: BadRequestExceptionResponse,
      status: HttpStatus.BAD_REQUEST,
    }),
    ApiResponse({
      type: ForbiddenExceptionResponse,
      status: HttpStatus.FORBIDDEN,
    }),
    ApiResponse({
      type: UnauthorizedExceptionResponse,
      status: HttpStatus.UNAUTHORIZED,
    }),
    ApiResponse({
      type: NotFoundExceptionResponse,
      status: HttpStatus.NOT_FOUND,
    }),
    ApiResponse({
      type: FatalErrorExceptionResponse,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    }),
    ApiOperation({ summary: args.description }),
    NestGet(args.path),
  );
}
