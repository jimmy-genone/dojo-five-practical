import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getCurrentTime', () => {
    it('should return current time in correct format', () => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date(2022,0,1,12,0));
      expect(service.getCurrentTime()).toEqual({ currentTime: '12:00:00 PM' });
    });
  });
});
