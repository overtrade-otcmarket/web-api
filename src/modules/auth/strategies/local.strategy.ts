import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      walletAddress: 'walletAddress',
    });
  }

  async validate(walletAddress: string) {
    console.log(walletAddress, 'wallet');

    const user = await this.authService.validateUser(walletAddress);
    console.log(user);

    return user;
  }
}
