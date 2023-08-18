import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioService {
  private config: TwilioServiceConfig = {};
  constructor(private configService: ConfigService) {
    this.config.account_sid =
      this.configService.get<string>('TWILIO_ACCOUNT_SID');
    this.config.auth_token =
      this.configService.get<string>('TWILIO_AUTH_TOKEN');
    if (this.config.account_sid === null || this.config.auth_token === null) {
      throw new Error('Twilio service failed to properly initialize');
    }
  }

  create() {}
}

interface TwilioServiceConfig {
  account_sid?: string;
  auth_token?: string;
}
