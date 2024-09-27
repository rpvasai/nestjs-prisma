import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateScreenDto } from './dto/update-screen.dto';

@Injectable()
export class ScreensService {
  constructor(private readonly prisma: PrismaService) {}
  create(createScreenDto: Prisma.ScreenCreateInput) {
    return this.prisma.screen.create({
      data: {
        ...createScreenDto,
      },
    });
  }

  findAll() {
    return this.prisma.screen.findMany();
  }

  findOne(id: string) {
    return this.prisma.screen.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateScreenDto: UpdateScreenDto) {
    return this.prisma.screen.update({
      where: {
        id,
      },
      data: {
        ...updateScreenDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.screen.delete({
      where: {
        id,
      },
    });
  }
}
