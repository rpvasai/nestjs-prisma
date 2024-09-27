import { ApiProperty } from '@nestjs/swagger';
import { Visibility } from '@prisma/client';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class FeatureDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({ enum: Visibility })
  @IsEnum(Visibility)
  visibility: Visibility;
}

export class CreateScreenDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: [FeatureDto] })
  features: FeatureDto[];
}
