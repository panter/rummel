import { Controller, Get } from '@nestjs/common';
import { Public } from '../decorators';

@Controller()
@Public()
export class HealthController {
  @Get('/__health')
  getReadiness(): string {
    return 'is healthy';
  }
}
