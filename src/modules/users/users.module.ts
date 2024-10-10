import { PrismaService } from '@/modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
