import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @Column('int', { default: 1 })
  creation_time: number;

  @Column('int', { default: 1 })
  reminder_time: number;

  constructor(reminder: Partial<Reminder>) {
    Object.assign(this, reminder);
  }
}
