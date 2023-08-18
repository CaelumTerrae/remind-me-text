import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemindmeController } from './remindme/remindme.controller';
import { TwilioService } from './twilio/twilio.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, RemindmeController],
  providers: [AppService, TwilioService],
})
export class AppModule {}
