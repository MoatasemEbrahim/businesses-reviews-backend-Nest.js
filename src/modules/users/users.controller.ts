import {
  Controller,
  Get,
  Post,
  UseGuards,
  BadRequestException,
  Body,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { UsersService } from './users.service';
import { User } from '../../interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // This API is called by Auth0 when a user logs in or registers
  @Post('auth0-sync')
  async register(@Res() res: Response, @Body() payload: any): Promise<void> {
    if (
      payload?.secretKey === process.env.AUTH0_LOGIN_HOOK_SECRET &&
      payload?.tenant.id === process.env.AUTH0_TENANT
    ) {
      await this.usersService.syncUserWithAuth0(payload?.user);
      res.status(200).send('OK');
    } else {
      throw new BadRequestException();
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // findAll(): Promise<User[]> {
  //   return this.usersService.findAll();
  // }
}
