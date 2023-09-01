import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReminderService } from 'src/entities/reminder/reminder.service';
import { TimeparserService } from 'src/timeparser/timeparser.service';
import { TwilioService } from 'src/twilio/twilio.service';

@Controller('remindme')
export class RemindmeController {
  constructor(
    private twilioService: TwilioService,
    private timeParserService: TimeparserService,
    private reminderService: ReminderService,
  ) {}

  @Get('/deliver/:bounceString')
  async generalBounceGet(
    @Param('bounceString') bounceString: string,
  ): Promise<string> {
    console.log(bounceString);
    const result = await this.twilioService.sendDefaultMessage();
    console.log('going to write a random string row in the db');
    this.reminderService.create();
    return JSON.stringify(result);
  }

  @Post('/receivesms')
  async recieveSMSPost(@Body('Body') text_response: string): Promise<string> {
    console.log(text_response);
    return this.twilioService.generateTwiMLResponse(
      "Heard, we'll remind you  '" +
        text_response +
        "' at " +
        this.timeParserService.convertToRoughString(new Date(Date.now())) +
        '!',
    );
  }
}
