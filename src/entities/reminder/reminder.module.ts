import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reminder } from './reminder.entity';
import { ReminderService } from './reminder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder])],
  providers: [ReminderService],
  exports: [ReminderService],
})
export class ReminderModule {}
