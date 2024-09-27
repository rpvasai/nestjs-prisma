import { IsString } from 'class-validator';

export class CreateScreenDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  url: string;
}
