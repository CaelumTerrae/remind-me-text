import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private config: TwilioServiceConfig = {};
  private client: any;
  private test_hardcoded_number_to_send_to: string;

  constructor(private configService: ConfigService) {
    this.config.account_sid =
      this.configService.get<string>('TWILIO_ACCOUNT_SID');
    this.config.auth_token =
      this.configService.get<string>('TWILIO_AUTH_TOKEN');
    this.config.test_number =
      this.configService.get<string>('TWILIO_TEST_NUMBER');
    if (
      this.config.account_sid === null ||
      this.config.auth_token === null ||
      this.config.test_number === null
    ) {
      throw new Error('Twilio service failed to properly initialize');
    }

    this.test_hardcoded_number_to_send_to =
      this.configService.get<string>('PERSONAL_NUMBER');

    this.client = Twilio(this.config.account_sid, this.config.auth_token);
  }

  create() {}

  async sendDefaultMessage() {
    if (this.client === null) {
      throw new Error(
        'Twilio Service cannot send message before the client is properly initialized',
      );
    }
    const result = await this.client.messages.create({
      body: 'This is a default message',
      from: this.config.test_number,
      to: this.test_hardcoded_number_to_send_to,
    });
    return result;
  }
}

interface TwilioServiceConfig {
  account_sid?: string;
  auth_token?: string;
  test_number?: string;
}
