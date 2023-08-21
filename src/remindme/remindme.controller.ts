import { Controller, Get, Param } from '@nestjs/common';
import { TwilioService } from 'src/twilio/twilio.service';

@Controller('remindme')
export class RemindmeController {
  constructor(private twilioService: TwilioService) {}

  // @Get(':deltaString')
  // generalRemindmeGet(@Param('deltaString') deltaString: string): string {
  //   return `This will return the query string ${deltaString} back to the user`;
  // }

  @Get(':bounceString')
  generalBounceGet(@Param('bounceString') bounceString: string): string {
    console.log(bounceString);
    this.twilioService.sendDefaultMessage();
    return 'this is gonna bounce the string through twilio to the user when the get request is made.';
  }
}
