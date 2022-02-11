import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth/auth.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  const appService = {
    getCurrentTime: () => "12:00:00 PM"
  };
  const authService = {
    login: () => ({token: "testtoken"})
  }

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthService],
    })
    .overrideProvider(AppService)
    .useValue(appService)
    .overrideProvider(AuthService)
    .useValue(authService)
    .compile();
  });


  describe('login', () => {
    it('should return token if user in service', () => {
      const appController = app.get<AppController>(AppController);
      const user = appController.login({user: {userId:1, username:"john"}})
      expect(user).toMatchObject({token: "testtoken"});
    });
  });

  describe('root', () => {
    it('should return time', () => {
      const appController = app.get<AppController>(AppController);
      const time = appController.getCurrentTime();
      expect(time).toEqual("12:00:00 PM")
    });
  });
});
