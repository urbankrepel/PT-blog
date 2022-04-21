import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PostService } from './post.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdatePostDto } from './update-post.dto';

@UseGuards(AuthGuard)
@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() data: CreatePostDto, @Req() req: Request) {
    const jwt = req.cookies['jwt'] || undefined;
    const user = await this.jwtService.verifyAsync(jwt);

    return this.postService.create({
      ...data,
      user: {
        id: user.id,
      },
    });
  }

  @Get()
  getAll() {
    return this.postService.all();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
    @Req() req: Request,
  ) {
    const jwt = req.cookies['jwt'] || undefined;
    const user = await this.jwtService.verifyAsync(jwt);

    const post = await this.postService.findOne(id);
    if (post.user.id !== user.id) {
      throw new UnauthorizedException('Nisi lastnik');
    }

    return this.postService.update(id, data);
  }
}
