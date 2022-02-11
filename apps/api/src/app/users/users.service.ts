import { Injectable } from '@nestjs/common';

export type User = {
  userId: number,
  username: string,
  password: string
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'tom',
      password: 'dojofive',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => {
      return user.username === username
    });
  }
}
