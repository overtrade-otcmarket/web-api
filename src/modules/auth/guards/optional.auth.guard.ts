import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VerifyUtils } from 'src/utils/commonFuntion/jwt';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const user = VerifyUtils.verifyToken(token, true);
        request.user = user; // Attach user data to request object
      } catch (error) {
        console.log('Invalid or expired token');
      }
    }

    return true; // Continue execution regardless of token presence
  }
}
