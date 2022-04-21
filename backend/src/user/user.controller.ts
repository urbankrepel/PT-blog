import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { UserUpdateDto } from './user-update.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
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
  find_one(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.userService.delete(id);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() data: UserUpdateDto,
  ) {
    return await this.userService.update(id, data);
  }
}
