import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnAuthorizedException } from './core/exceptions/response.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requiredAuthorization = this._reflector.get<string[]>(
      'authorization',
      context.getHandler(),
    );

    if (requiredAuthorization) {
      const token = request.headers['authorization'];
      if (!token) {
        throw new UnAuthorizedException();
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        request['user'] = payload;
      } catch (err) {
        throw new UnAuthorizedException();
      }
    }

    return true;
  }
}
