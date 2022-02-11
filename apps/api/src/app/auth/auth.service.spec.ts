import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'
import { User, UsersService } from '../users/users.service'

describe('AuthService', () => {
  let service: AuthService;
  const userService = { findOne: () => ({
    userId: 1,
    username: 'john',
    password: 'changeme',
  })}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

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
});
