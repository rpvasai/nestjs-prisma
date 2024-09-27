import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';

@Module({
  controllers: [ScreensController],
  providers: [ScreensService, PrismaService],
})
export class ScreensModule {}
