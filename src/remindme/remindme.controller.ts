import { Controller, Get, Post, Param } from '@nestjs/common';
import { TwilioService } from 'src/twilio/twilio.service';
import MessagingResponse from 'twilio/lib/twiml/MessagingResponse';

@Controller('remindme')
export class RemindmeController {
  constructor(private twilioService: TwilioService) {}

  // @Get(':deltaString')
  // generalRemindmeGet(@Param('deltaString') deltaString: string): string {
  //   return `This will return the query string ${deltaString} back to the user`;
  // }

  @Get('/deliver/:bounceString')
  async generalBounceGet(
    @Param('bounceString') bounceString: string,
  ): Promise<string> {
    console.log(bounceString);
    const result = await this.twilioService.sendDefaultMessage();
    return JSON.stringify(result);
  }

  @Post('/receivesms')
  async recieveSMSPost(): Promise<void> {
    console.log('received a message from the server');
    const twiml = new MessagingResponse();

    twiml.message("Heard, we'll remind you then!");

    return twiml.toString();
  }
}
