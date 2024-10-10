import { ForbiddenException, Injectable } from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) {
      throw new ForbiddenException('User already exists');
    }
    const hashedPassword = hashSync(createUserDto.password, 10);
    return await this.prismaService.user.create({
      data: {
        email: createUserDto.email.toLowerCase(),
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
