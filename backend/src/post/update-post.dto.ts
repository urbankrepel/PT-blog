import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  content?: string;
}
