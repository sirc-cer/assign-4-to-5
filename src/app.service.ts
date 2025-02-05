import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! hi sir magandang araw po <3 ^_^';
  }
}
