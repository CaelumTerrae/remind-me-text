import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Reminder } from './reminder.entity';

@Injectable()
export class ReminderService {
  constructor(private readonly entityManager: EntityManager) {}

  async create() {
    const reminder = new Reminder({ phone_number: '+12014064772' });
    await this.entityManager.save(reminder);
  }
}
