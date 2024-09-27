import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ACLService } from './acl.service';

@ApiTags('ACL')
@Controller('acl')
export class ACLController {
  constructor(private readonly aclService: ACLService) {}

  @Post()
  async createACL(
    @Body()
    body: Prisma.ACLCreateInput,
  ) {
    return this.aclService.createACL(body);
  }

  @Get(':userId/:resource/:action/:resourceId')
  async getACL(
    @Param('userId') userId: string,
    @Param('resource') resource: string,
    @Param('action') action: string,
    @Param('resourceId') resourceId: string,
  ) {
    return this.aclService.getACLByUserAndResource(
      userId,
      resource,
      action,
      resourceId,
    );
  }

  // Update ACL Entry
  @Patch(':aclId')
  async updateACL(
    @Param('aclId') aclId: string,
    @Body() data: { allow?: boolean },
  ) {
    return this.aclService.updateACL(aclId, data);
  }

  // Delete ACL Entry
  @Delete(':aclId')
  async deleteACL(@Param('aclId') aclId: string) {
    return this.aclService.deleteACL(aclId);
  }

  // Check access for user, resource, action
  @Post('check-access')
  async checkAccess(
    @Body()
    body: {
      userId: string;
      resource: string;
      action: string;
      resourceId: string;
    },
  ) {
    const canAccess = await this.aclService.canAccess(
      body.userId,
      body.resource,
      body.action,
      body.resourceId,
    );
    if (!canAccess) {
      throw new ForbiddenException('Access Denied');
    }
    return { access: 'Granted' };
  }
}
