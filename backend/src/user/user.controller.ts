import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserUpdateDto } from './user-update.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async profile(@Req() req: Request) {
    const jwt = req.cookies['jwt'] || undefined;
    const data = await this.jwtService.verifyAsync(jwt);
    return this.userService.findOne(data.id);
  }

  @Post()
  async create(@Body() data: RegisterDto) {
    if (data.password !== data.password_confirm) {
      throw new BadRequestException('Gesli se ne ujemat');
    }

    const hashed = await bcrypt.hash(data.password, 12);

    return this.userService.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashed,
    });
  }

  @Get('/all')
  all() {
    return this.userService.all();
  }

  @Get(':id')
  find_one(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return await this.userService.update(id, data);
  }
}
