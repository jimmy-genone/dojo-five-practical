import { Test, TestingModule } from '@nestjs/testing';
import { User, UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if user not found', async () => {
    const user = await service.findOne("notauser");
    expect(user).toBeUndefined()
  });

  it('should return user if found', async () => {
    const user = await service.findOne("john");
    expect(user).toMatchObject<User>({
      userId: 1,
      username: 'john',
      password: 'changeme',
    })
  });
});
