import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { SignInFormDto } from './create-sign-in.dto';
import { SignupFormDto } from './create-sign-up.dto';

export class CreateFeatureDto {
  @ApiProperty({
    description: 'Name of the feature',
    example: 'User Authentication',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Associated SignInForm for the feature',
    type: SignInFormDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SignInFormDto) // Required to properly transform nested object
  signInForm?: SignInFormDto;

  @ApiProperty({
    description: 'Associated SignUpForm for the feature',
    type: SignupFormDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SignupFormDto) // Required to properly transform nested object
  signupForm?: SignupFormDto;
}
