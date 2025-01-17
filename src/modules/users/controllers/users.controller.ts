import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenGuard } from 'src/modules/auth/guards/authen.guard';
import {
  getUserOrdersDto,
  getUserTransactionsDto,
  UpdateUserProfileDto,
} from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users') // put the name of the controller in swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile/:walletAddress')
  getUserProfile(@Param('walletAddress') walletAddress: string) {
    return this.usersService.getUserProfile(walletAddress);
  }

  @Get('orders')
  @UseGuards(AuthenGuard)
  getUserOrders(@Req() req: { user: any }, @Query() query: getUserOrdersDto) {
    const userInfo = req.user;
    return this.usersService.getUserOrders(query, userInfo);
  }

  @Get('transactions')
  @UseGuards(AuthenGuard)
  getUserTransactions(
    @Req() req: { user: any },
    @Query() query: getUserTransactionsDto,
  ) {
    const userInfo = req.user;
    return this.usersService.getUserTransactions(query, userInfo);
  }

  @ApiBearerAuth('access-token') //edit here
  @UseGuards(AuthenGuard)
  @Post('update-profile')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  updateUserProfile(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
    },
    @Req() req: { user: any },
    @Body() body: UpdateUserProfileDto,
  ) {
    const userInfo = req.user;
    return this.usersService.updateUserProfile(userInfo, body, files);
  }
}
