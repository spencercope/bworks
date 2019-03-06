import { Controller, Get, Res } from '@nestjs/common';
import { resolve } from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Res() res): void {
    res.sendFile(resolve('../public/client/index.html'));
  }
}
