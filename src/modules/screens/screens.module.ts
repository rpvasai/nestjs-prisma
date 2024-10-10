import { PermissionGuard } from '@/guards/permission/permission.guard';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScreensController } from './screens.controller';
import { ScreensService } from './screens.service';

@Module({
  controllers: [ScreensController],
  providers: [ScreensService, PrismaService, PermissionGuard],
})
export class ScreensModule {}
