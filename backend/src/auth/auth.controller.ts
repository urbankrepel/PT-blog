import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { UserUpdateDto } from 'src/user/user-update.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RegisterDto } from 'src/user/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) {
      throw new NotFoundException('Email ne obstaja!');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new BadRequestException('Geslo ni pravilno');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    res.cookie('jwt', jwt, { httpOnly: true });
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    if (data.password !== data.password_confirm) {
      throw new BadRequestException('Gesli se ne ujemat');
    }

    const hashed = await bcrypt.hash(data.password, 12);

    return this.userService.create({
      ...data,
      password: hashed,
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return { message: 'Odjavljeni' };
  }
}
