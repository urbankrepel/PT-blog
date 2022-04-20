import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PostService } from './post.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
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
}
