import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content: string;
}
