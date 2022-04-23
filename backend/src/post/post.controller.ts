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
  Res,
  StreamableFile,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './create-post.dto';
import { PostService } from './post.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdatePostDto } from './update-post.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@UseGuards(AuthGuard)
@Controller('post')
@UseInterceptors(ClassSerializerInterceptor)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req: Request, file, cb) => {
        let allowTypesOfFiles: Array<string> = ['image/jpeg', 'image/png'];
        if (allowTypesOfFiles.indexOf(file.mimetype) > -1) {
          cb(null, true);
        } else {
          cb(new BadRequestException('This file type is not allowed'), false);
        }
      },
    }),
  )
  async create(
    @Body() data: CreatePostDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const jwt = req.cookies['jwt'] || undefined;
    const user = await this.jwtService.verifyAsync(jwt);
    if (file) {
      console.log(file);
      return this.postService.create({
        ...data,
        user: {
          id: user.id,
        },
        picture_path: file.path,
        picture_type: file.mimetype,
      });
    } else {
      return this.postService.create({
        ...data,
        user: {
          id: user.id,
        },
      });
    }
  }

  @Get()
  getAll() {
    return this.postService.all();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const jwt = req.cookies['jwt'] || undefined;
    const user = await this.jwtService.verifyAsync(jwt);

    const post = await this.postService.findOne(id);
    if (post.user.id !== user.id) {
      throw new UnauthorizedException('Nisi lastnik');
    }
    return this.postService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const jwt = req.cookies['jwt'] || undefined;
    const user = await this.jwtService.verifyAsync(jwt);

    const post = await this.postService.findOne(id);
    if (post.user.id !== user.id) {
      throw new UnauthorizedException('Nisi lastnik');
    }
    return this.postService.delete(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req: Request, file, cb) => {
        let allowTypesOfFiles: Array<string> = ['image/jpeg', 'image/png'];
        if (allowTypesOfFiles.indexOf(file.mimetype) > -1) {
          cb(null, true);
        } else {
          cb(new BadRequestException('This file type is not allowed'), false);
        }
      },
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const jwt = req.cookies['jwt'] || undefined;
    const user = await this.jwtService.verifyAsync(jwt);

    const post = await this.postService.findOne(id);
    if (post.user.id !== user.id) {
      throw new UnauthorizedException('Nisi lastnik');
    }
    if (file) {
      console.log(file);
      return this.postService.update(id, {
        ...data,
        picture_path: file.path,
        picture_type: file.mimetype,
      });
    } else {
      return this.postService.update(post.id, {
        ...data,
      });
    }
  }

  @Get('image/:id')
  async getImage(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const post = await this.postService.findOne(id);
    if (!post) {
      throw new UnauthorizedException('Ta post ne obstaja');
    }
    if (post.picture_path === '' || post.picture_type === '') {
      const file = createReadStream(
        join(process.cwd(), 'uploads/No_Image_Available.jpg'),
      );
      res.set({ 'Content-Type': 'image/jpeg' });

      return new StreamableFile(file);
    } else {
      const file = createReadStream(join(process.cwd(), post.picture_path));
      res.set({ 'Content-Type': post.picture_type });

      return new StreamableFile(file);
    }
  }
}
