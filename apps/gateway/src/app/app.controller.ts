import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHome() {
    return { title: 'Bookhaus | Home' };
  }
}