// src/auth/role.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { CustomDecorator } from '@nestjs/common/decorators/core/set-metadata.decorator'; // Import CustomDecorator
// import { MethodDecorator } from '@nestjs/common'; // Import MethodDecorator //not needed, provided globally.
export const ROLES_KEY = 'roles'; // Define the key for metadata

// Alternative for multiple roles (if your Role decorator supports it):
 export const Roles = (...roles: string[]): MethodDecorator => {
 return SetMetadata(ROLES_KEY, roles);
};