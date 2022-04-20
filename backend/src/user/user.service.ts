import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserUpdateDto } from './user-update.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userReposetory: Repository<User>,
  ) {}

  create(data): Promise<User> {
    return this.userReposetory.save(data);
  }

  all(): Promise<User[]> {
    return this.userReposetory.find();
  }

  findOne(id: number): Promise<User> {
    return this.userReposetory.findOne({ id });
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.userReposetory.findOne({ email });
  }

  delete(id: number) {
    return this.userReposetory.delete({ id });
  }

  async update(id: number, data: UserUpdateDto): Promise<User> {
    await this.userReposetory.update({ id }, data);

    return this.userReposetory.findOne({ id });
  }
}
