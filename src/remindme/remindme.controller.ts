import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TimeparserService } from 'src/timeparser/timeparser.service';
import { TwilioService } from 'src/twilio/twilio.service';

@Controller('remindme')
export class RemindmeController {
  constructor(
    private twilioService: TwilioService,
    private timeParserService: TimeparserService,
  ) {}

  @Get('/deliver/:bounceString')
  async generalBounceGet(
    @Param('bounceString') bounceString: string,
  ): Promise<string> {
    console.log(bounceString);
    const result = await this.twilioService.sendDefaultMessage();
    return JSON.stringify(result);
  }

  @Post('/receivesms')
  async recieveSMSPost(@Body('Body') text_response: string): Promise<string> {
    console.log(text_response);
    return this.twilioService.generateTwiMLResponse(
      `Heard, we'll remind you  \'${text_response}\' at ${this.timeParserService.convertToRoughString(
        new Date(Date.now()),
      )}!`,
    );
  }
}
