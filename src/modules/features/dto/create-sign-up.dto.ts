import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUrl,
  IsJSON,
} from 'class-validator';

export class SignupFormDto {
  @ApiProperty({
    description: 'Name of the form',
    example: 'User Signup Form',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Description of the form',
    example: 'A form for new users to sign up',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'URL of the logo to be displayed on the form',
    example: 'https://example.com/logo.png',
  })
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

  @ApiProperty({
    description: 'Confirm Password field configuration in JSON format',
    example:
      '{ "placeholder": "Confirm your password", "validation": { "required": true, "match": "password" } }',
  })
  @IsJSON()
  readonly confirmPassword: object;

  @ApiPropertyOptional({
    description: 'Optional field for first name',
    example:
      '{ "placeholder": "Enter your first name", "validation": { "required": false } }',
  })
  @IsOptional()
  @IsJSON()
  readonly firstName?: object;

  @ApiPropertyOptional({
    description: 'Optional field for last name',
    example:
      '{ "placeholder": "Enter your last name", "validation": { "required": false } }',
  })
  @IsOptional()
  @IsJSON()
  readonly lastName?: object;

  @ApiPropertyOptional({
    description: 'Optional field for phone number',
    example:
      '{ "placeholder": "Enter your phone number", "validation": { "required": false } }',
  })
  @IsOptional()
  @IsJSON()
  readonly phoneNumber?: object;

  @ApiPropertyOptional({
    description: 'Link to login page',
    example: 'https://example.com/login',
  })
  @IsOptional()
  @IsUrl()
  readonly loginLink?: string;

  @ApiPropertyOptional({
    description: 'Array of enabled social signup options in JSON format',
    example:
      '[ { "provider": "Google", "enabled": true }, { "provider": "Facebook", "enabled": false } ]',
  })
  @IsOptional()
  @IsJSON()
  readonly socialSignups?: object;

  @ApiPropertyOptional({
    description: 'Custom CSS for styling the signup form',
    example: '.signup-form { background-color: #f0f0f0; }',
  })
  @IsOptional()
  @IsString()
  readonly customCss?: string;

  @ApiPropertyOptional({
    description: 'URL to redirect after successful signup',
    example: 'https://example.com/welcome',
  })
  @IsOptional()
  @IsUrl()
  readonly redirectUrl?: string;

  @ApiProperty({
    description: 'Link to terms and conditions',
    example: 'https://example.com/terms',
  })
  @IsUrl()
  readonly termsAndConditions: string;

  @ApiProperty({
    description: 'Link to privacy policy',
    example: 'https://example.com/privacy',
  })
  @IsUrl()
  readonly privacyPolicy: string;

  @ApiProperty({
    description: 'Indicates if email verification is required',
    default: false,
  })
  @IsBoolean()
  readonly emailVerification: boolean;
}
