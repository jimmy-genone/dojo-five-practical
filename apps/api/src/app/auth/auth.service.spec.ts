import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt'
import { User, UsersService } from '../users/users.service'
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const userService = { findOne: () => ({
    userId: 1,
    username: 'john',
    password: 'changeme',
  })}
  const jwtService = {
    sign: () => "jwtServiceSinedtoken"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtService,UsersService,AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('user validation should be null if not a user', async () => {
      const validatedUser = await service.validateUser("notauser", "somepassword")
      expect(validatedUser).toBeNull()
    });

    it('user validation should be null if user password incorrect', async () => {
      const validatedUser = await service.validateUser("john", "wrongpassword")
      expect(validatedUser).toBeNull()
    });

    it('should return user without password', async () => {
      const validatedUser = await service.validateUser("john", "changeme")
      expect(validatedUser).toMatchObject<Omit<User,'password'>>({
        userId: 1,
        username: 'john'
      })
    });
  })

  describe('login', () => {
    it('should return signed access token from use inf', async () => {
      const token = await service.login({username:"test", userId:4})
      expect(token).toMatchObject<{access_token: string}>({
        access_token: "jwtServiceSinedtoken"
      })
    });
  })

});
