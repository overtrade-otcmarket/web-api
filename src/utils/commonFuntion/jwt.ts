import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
export class VerifyUtils {
  public static createToken(payload, options: SignOptions) {
    const signOptions = Object.assign(
      {
        algorithm: 'HS256',
      },
      options,
    );
    return new Promise((resolve, reject) => {
      jwt.sign(payload, process.env.JWT_SECRET, signOptions, (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded);
        }
      });
    });
  }

  public static verifyToken(token: string, ignoreExpiration?: boolean): any {
    if (ignoreExpiration) {
      const res = jwt.verify(
        token,
        process.env.JWT_SECRET,
        {
          ignoreExpiration: ignoreExpiration,
        },
        (err: any, decoded: unknown) => {
          if (err) {
            return null;
          } else {
            return decoded;
          }
        },
      );

      return res;
    } else {
      const res = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err: any, decoded: unknown) => {
          if (err) {
            return null;
          } else {
            return decoded;
          }
        },
      );

      return res;
    }
  }
}
