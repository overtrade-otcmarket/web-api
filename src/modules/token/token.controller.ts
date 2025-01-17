import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenGuard } from '../auth/guards/authen.guard';
import { ImportTokenDto } from './dto/import-token.dto';
import { TokenService } from './token.service';
import { User } from '../auth/decorators/user.decorator';
import { GetAllTokenDto, QuoteTokenDto } from './dto/get-all-tokens.dto';

@ApiTags('Token Api')
@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @ApiOperation({ summary: 'Get list token' })
  @Get('/get-list')
  getListToken(@Query() query: GetAllTokenDto) {
    return this.tokenService.getListToken(query);
  }

  @ApiOperation({ summary: 'Quote token' })
  @Get('/quote-token')
  quoteToken(@Query() query: QuoteTokenDto) {
    return this.tokenService.quoteToken(query);
  }

  // @UseGuards(AuthenGuard)
  @ApiOperation({ summary: 'Get token info' })
  @Get('/get-token-info/:tokenAddress')
  getTokenInfo(@Param('tokenAddress') tokenAddress: string) {
    return this.tokenService.getTokenDetail(tokenAddress);
  }

  @ApiBearerAuth('access-token') //edit here
  @UseGuards(AuthenGuard)
  @ApiOperation({ summary: 'import token' })
  @Post('/import-token')
  importToken(@User() user: any, @Body() body: ImportTokenDto) {
    return this.tokenService.importToken(user, body);
  }

  @ApiOperation({ summary: 'Get strk price' })
  @Get('/get-strk-price')
  getStrkPrice() {
    return this.tokenService.getStrkPrice();
  }

  @ApiOperation({ summary: 'Get token price' })
  @Get('/get-token-price/:tokenAddress')
  getTokenPrice(@Param('tokenAddress') tokenAddress: string) {
    return this.tokenService.getTokenPrice(tokenAddress);
  }
}
