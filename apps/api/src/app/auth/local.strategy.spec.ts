import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { LocalStrategy } from './local.strategy'
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { User } from '../users/users.service'

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  const authService = {
    validateUser: (username:string, password:string) => {
      if (username === "john" && password === "changeme") {
        return {
          userId: 1,
          username: 'john'
        }
      } else {
        return null
      }
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService, LocalStrategy],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user is credentials correct', async () => {
    const user = await strategy.validate("john","changeme")
    expect(user).toMatchObject<Omit<User, 'password'>>({
      userId: 1,
      username: 'john'
    })
  });

  it('should throw exception if credentials incorrect', async () => {
    expect(async () => {
      await strategy.validate("john","wrongpassword")
    }).rejects
      .toThrowError(UnauthorizedException);
  });
});
