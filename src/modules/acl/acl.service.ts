import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have PrismaService
@Injectable()
export class ACLService {
  constructor(private prisma: PrismaService) {}

  // Create ACL Entry
  async createACL(aclDto: Prisma.ACLCreateInput) {
    return this.prisma.aCL.create({
      data: aclDto,
    });
  }

  // Read ACL Entry (by user and resource)
  async getACLByUserAndResource(
    userId: string,
    resource: string,
    action: string,
    resourceId: string,
  ) {
    return this.prisma.aCL.findFirst({
      where: { userId, resource, action, resourceId },
    });
  }

  // Read All ACL Entries (for a given user)
  async getACLForUser(userId: string) {
    return this.prisma.aCL.findMany({
      where: { userId },
    });
  }

  // Update ACL Entry (Change allow or other fields)
  async updateACL(aclId: string, data: { allow?: boolean; action?: string }) {
    return this.prisma.aCL.update({
      where: { id: aclId },
      data,
    });
  }

  // Delete ACL Entry
  async deleteACL(aclId: string) {
    return this.prisma.aCL.delete({
      where: { id: aclId },
    });
  }

  // Check Access (for dynamic checks)
  async canAccess(
    userId: string,
    resource: string,
    action: string,
    resourceId: string,
  ): Promise<boolean> {
    const acl = await this.prisma.aCL.findFirst({
      where: {
        userId,
        resource,
        action,
        resourceId,
        allow: true,
      },
    });
    return !!acl;
  }
}
