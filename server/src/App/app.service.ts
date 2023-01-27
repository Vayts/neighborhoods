import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [{ id: 'dad', name: 'asdsa' }];
  }
}
