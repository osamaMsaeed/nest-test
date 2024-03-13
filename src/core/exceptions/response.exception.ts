import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(key: string = 'Resource not found', data?: any) {
    super({ key, data }, HttpStatus.NOT_FOUND);
  }
}
export class UnAuthorizedException extends HttpException {
  constructor(key: string = 'Unauthorized resource', data?: any) {
    super({ key, data }, HttpStatus.UNAUTHORIZED);
  }
}
export class BadRequestException extends HttpException {
  constructor(key: string = 'Bad request', data?: any) {
    super({ key, data }, HttpStatus.BAD_REQUEST);
  }
}
export class ForbiddenException extends HttpException {
  constructor(key: string = 'Access not allowed', data?: any) {
    super({ key, data }, HttpStatus.FORBIDDEN);
  }
}
export class FatalErrorException extends HttpException {
  constructor(key: string = 'Something went wrong', data?: any) {
    super({ key, data }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
