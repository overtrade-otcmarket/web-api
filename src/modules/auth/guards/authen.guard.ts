import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VerifyUtils } from 'src/utils/commonFuntion/jwt';
import { ErrorCodeEnum } from 'src/utils/enum/ErrorMessageEnum';

@Injectable()
export class AuthenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization'].split(' ')[1];

    if (!token) {
      throw new HttpException(ErrorCodeEnum.ERR_4, HttpStatus.UNAUTHORIZED);
    }

    const dataToken = VerifyUtils.verifyToken(token, true);

    if (!dataToken) {
      throw new HttpException(ErrorCodeEnum.ERR_4, HttpStatus.UNAUTHORIZED);
    }

    // if (dataToken && Number(dataToken.exp) * 1000 < Date.now()) {
    //   throw new HttpException(ErrorCodeEnum.ERR_5, HttpStatus.BAD_REQUEST);
    // }

    req.user = dataToken || null;

    return true;
  }
}
