import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { PermissionGuard } from '@/guards/permission/permission.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Screens')
@Controller('screens')
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @ApiOperation({
    summary: 'Create a new screen',
  })
  @ApiResponse({
    status: 201,
    description: 'The screen has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  create(@Body() createScreenDto: CreateScreenDto) {
    return this.screensService.create(createScreenDto);
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get()
  findAll() {
    return this.screensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screensService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateScreenDto: Prisma.ScreenUpdateInput,
  ) {
    return this.screensService.update(id, updateScreenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screensService.remove(id);
  }
}
