import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postReposetory: Repository<Post>,
  ) {}

  create(data): Promise<Post> {
    return this.postReposetory.save(data);
  }

  all(): Promise<Post[]> {
    return this.postReposetory.find({
      order: { created_at: 'DESC' },
    });
  }

  findOne(id: number): Promise<Post> {
    return this.postReposetory.findOne({ id });
  }

  delete(id: number) {
    return this.postReposetory.delete({ id });
  }

  async update(id: number, data): Promise<Post> {
    await this.postReposetory.update({ id }, data);

    return this.postReposetory.findOne({ id });
  }
}
