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
        screenFeatures: {
          create: createScreenDto.features.map((feature) => ({
            enabled: feature.enabled,
            visibility: feature.visibility,
          })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.screen.findMany({
      include: {
        screenFeatures: {
          include: {
            feature: {
              include: {
                signInForm: true,
                SignupForm: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.screen.findUnique({
      where: {
        id,
      },
      include: {
        screenFeatures: {
          include: {
            feature: {
              include: {
                signInForm: true,
                SignupForm: true,
              },
            },
          },
        },
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
