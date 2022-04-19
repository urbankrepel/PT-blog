import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserUpdateDto } from './user-update.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  profile() {
    return 'Urban Krepel';
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
