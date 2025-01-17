import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetRefreshResponse,
  LoginDto,
  PostLoginResponse,
} from '../dto/login.dto';
import JwtRefreshGuard from '../guards/jwt-refresh.guard';
import { PayloadToken } from '../models/token.model';
import { AuthService } from '../services/auth.service';
import { AuthenGuard } from '../guards/authen.guard';

type AuthorizedRequest = Express.Request & {
  headers: { authorization: string };
  user: PayloadToken;
};

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth('access-token') //edit here
  @ApiResponse({ type: PostLoginResponse, status: 200 })
  @UseGuards(AuthenGuard)
  @HttpCode(200)
  @Get('profile')
  profile(@Req() req) {
    const userInfo = req.user;
    return this.authService.profile(userInfo);
  }

  @ApiBody({ type: LoginDto })
  @ApiResponse({ type: PostLoginResponse, status: 200 })
  @HttpCode(200)
  @Post('login')
  login(@Body() payloads: LoginDto) {
    return this.authService.login(payloads);
  }

  @ApiResponse({ status: 200, type: GetRefreshResponse })
  @ApiBearerAuth('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req: AuthorizedRequest) {
    return this.authService.createAccessTokenFromRefreshToken(req.user);
  }
}
