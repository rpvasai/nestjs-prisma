import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class FeaturesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFeatureDto: Prisma.FeatureCreateInput) {
    return this.prisma.feature.create({
      data: {
        ...createFeatureDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.feature.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.feature.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateFeatureDto: Prisma.FeatureUpdateInput) {
    return await this.prisma.feature.update({
      where: {
        id,
      },
      data: {
        ...updateFeatureDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.feature.delete({
      where: {
        id,
      },
    });
  }
}
