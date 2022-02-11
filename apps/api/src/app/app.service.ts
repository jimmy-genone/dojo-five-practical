import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCurrentTime() {
    const currentTime = (new Date()).toLocaleTimeString(undefined, {
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    return {currentTime}
  }
}
