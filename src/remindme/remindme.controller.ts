import { Controller, Get, Param } from '@nestjs/common';

@Controller('remindme')
export class RemindmeController {
  @Get(':deltaString')
  generalRemindmeGet(@Param('deltaString') deltaString: string): string {
    return `This will return the query string ${deltaString} back to the user`;
  }
}
