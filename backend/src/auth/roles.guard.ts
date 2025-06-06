import {
  CanActivate, ExecutionContext, Injectable, ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator'; // Import ROLES_KEY here

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== requiredRole) {
      throw new ForbiddenException(`Access denied for role: ${user?.role}`);
    }

    return true;
  }
}

