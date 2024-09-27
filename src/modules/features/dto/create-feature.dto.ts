import { ApiProperty } from '@nestjs/swagger';
import { InputJsonValue } from '@prisma/client/runtime/library';

export class LoginForm {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  logoUrl: string;
  @ApiProperty()
  email: InputJsonValue;
  @ApiProperty()
  password: InputJsonValue;
  @ApiProperty()
  rememberMe: boolean;
  @ApiProperty()
  registerLink: string;
  @ApiProperty()
  resetPasswordLink: string;
  @ApiProperty()
  createdAt?: Date | string;
  @ApiProperty()
  updatedAt?: Date | string;
}

export class CreateFeatureDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  loginForm?: LoginForm;
}
