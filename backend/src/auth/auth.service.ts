// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user based on email and password.
   * @param email - The user's email.
   * @param pass - The user's password.
   * @returns The user object without the password if validation is successful, otherwise null.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Logs in a user and returns a JWT access token.
   * @param user - The user object.
   * @returns An object containing the JWT access token.
   */
  async login(user: any) {
    console.log('--- AuthService: Preparing JWT payload ---');
    console.log('User object received for login:', user);

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    // Defensive check and log if properties are missing
    if (!user.firstName || !user.lastName) {
      console.warn(
        'WARNING: firstName or lastName is missing from the user object passed to login.',
      );
      console.warn('Payload being signed:', payload);
    } else {
      console.log('Payload being signed:', payload);
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
