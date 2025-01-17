import { Injectable } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';

@Injectable()
export class LocalGuard {
  handleRequest(err, user, info) {
    console.log(err, user, info);

    // if (info instanceof jwt.TokenExpiredError) {
    //   throw new HttpException('Token expired', HTTP_STATUS_TOKEN_EXPIRED);
    // }

    // if (err || !user) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.UNAUTHORIZED,
    //       error: 'Unauthorized user',
    //     },
    //     HttpStatus.UNAUTHORIZED,
    //   );
    // }

    return true;
  }
}
