import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsBoolean,
  IsInt,
  IsJSON,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class SignInFormDto {
  @ApiProperty({ description: 'Name of the form' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Description of the form' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'URL of the logo to be displayed on the form' })
  @IsUrl()
  readonly logoUrl: string;

  @ApiProperty({
    description: 'Email field configuration in JSON format',
    example:
      '{ "placeholder": "Enter your email", "validation": { "required": true, "format": "email" } }',
  })
  @IsJSON()
  readonly email: object;

  @ApiProperty({
    description: 'Password field configuration in JSON format',
    example:
      '{ "placeholder": "Enter your password", "validation": { "required": true, "minLength": 8 } }',
  })
  @IsJSON()
  readonly password: object;

  @ApiProperty({ description: 'Whether the "Remember Me" checkbox is enabled' })
  @IsBoolean()
  readonly rememberMe: boolean;

  @ApiPropertyOptional({ description: 'URL for the registration page' })
  @IsOptional()
  @IsUrl()
  readonly registerLink?: string;

  @ApiPropertyOptional({ description: 'URL for the reset password page' })
  @IsOptional()
  @IsUrl()
  readonly resetPasswordLink?: string;

  @ApiPropertyOptional({
    description: 'Array of enabled social login options in JSON format',
  })
  @IsOptional()
  @IsJSON()
  readonly socialLogins?: object;

  @ApiProperty({
    description: 'Whether two-factor authentication is enabled',
    default: false,
  })
  @IsBoolean()
  @Type(() => Boolean)
  readonly twoFactorAuth: boolean;

  @ApiPropertyOptional({ description: 'Custom CSS for styling the login form' })
  @IsOptional()
  @IsString()
  readonly customCss?: string;

  @ApiPropertyOptional({
    description: 'URL to redirect to after successful login',
  })
  @IsOptional()
  @IsUrl()
  readonly redirectUrl?: string;

  @ApiPropertyOptional({ description: 'Max login attempts before lockout' })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  readonly maxAttempts?: number;

  @ApiPropertyOptional({ description: 'Lockout duration in minutes' })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly lockoutDuration?: number;

  @ApiPropertyOptional({ description: 'Link to terms and conditions page' })
  @IsOptional()
  @IsUrl()
  readonly termsAndConditions?: string;

  @ApiPropertyOptional({ description: 'Link to privacy policy page' })
  @IsOptional()
  @IsUrl()
  readonly privacyPolicy?: string;
}
