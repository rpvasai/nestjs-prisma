import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScreenDto } from './dto/create-screen.dto';

@Injectable()
export class ScreensService {
  constructor(private readonly prisma: PrismaService) {}

  create(createScreenDto: CreateScreenDto) {
    return this.prisma.screen.create({
      data: {
        name: createScreenDto.name,
        features: {
          create: createScreenDto.features.map((feature) => ({
            enabled: feature.enabled,
            visibility: feature.visibility,
          })),
        },
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

  update(id: string, updateScreenDto: Prisma.ScreenUpdateInput) {
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
