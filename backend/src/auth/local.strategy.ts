import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    // --- Start Debug Logging ---
    console.log('--- LocalStrategy: Starting validation ---');
    console.log(`Attempting to validate user with email: ${email}`);

    // WARNING: Logging plaintext passwords is a security risk.
    // This should only be done for temporary debugging in a secure development environment.
    // Remember to remove this log line after debugging.
    console.log(`Password received by strategy: "${password}"`);
    // --- End Debug Logging ---

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      console.error(`Validation failed: User with email ${email} not found.`);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(`User found: ${user.email}. Comparing passwords...`);
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (isPasswordMatching) {
      console.log('Validation successful: Passwords match.');
      const { password, ...result } = user;
      return result;
    } else {
      console.error('Validation FAILED: Password comparison returned false.');
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}

