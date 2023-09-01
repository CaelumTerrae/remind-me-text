import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemindmeController } from './remindme/remindme.controller';
import { ConfigModule } from '@nestjs/config';
import { RemindmeModule } from './remindme/remindme.module';
import { TwilioService } from './twilio/twilio.service';
import { TimeparserService } from './timeparser/timeparser.service';
import { DatabaseModule } from './database/database.module';
import { ReminderModule } from './entities/reminder/reminder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReminderModule,
    RemindmeModule,
    DatabaseModule,
  ],
  controllers: [AppController, RemindmeController],
  providers: [AppService, TwilioService, TimeparserService],
})
export class AppModule {}
