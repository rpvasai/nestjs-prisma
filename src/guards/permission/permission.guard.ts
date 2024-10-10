import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // assuming you've set up user authentication
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const resource = request.route.path.split('/')[2];
    const action = request.method.toLowerCase();
    const userRoles = await this.prisma.role.findMany({
      where: {
        users: { some: { id: user.id } },
      },
    });
    const isAdmin = userRoles.some((role) => role.name === 'admin');

    // If the user is an admin, allow access to everything
    if (isAdmin) {
      return true;
    }

    // Check for resource-specific permissions
    const hasPermission = await this.prisma.permission.findFirst({
      where: {
        userId: user.id,
        resource: resource,
        action: this.mapHttpMethodToAction(action),
      },
    });

    if (!hasPermission) {
      throw new ForbiddenException(
        `You do not have permission to ${action} this ${resource}.`,
      );
    }

    return true;
  }

  // Helper method to map HTTP verbs to actions
  private mapHttpMethodToAction(method: string): string {
    switch (method) {
      case 'post':
        return 'create';
      case 'put':
        return 'update';
      case 'delete':
        return 'delete';
      case 'get':
        return 'read';
      default:
        return method;
    }
  }
}
