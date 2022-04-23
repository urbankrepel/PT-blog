import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CommonModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
