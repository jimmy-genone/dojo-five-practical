import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async validateUser(username: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: Omit<User, 'password'>) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
