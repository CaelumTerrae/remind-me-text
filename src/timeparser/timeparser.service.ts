import { Injectable } from '@nestjs/common';
import * as chrono from 'chrono-node';

@Injectable()
export class TimeparserService {
  constructor() {}

  convertToTimeDelta(date_string: string): Date {
    const now_as_reference_date = new Date(Date.now());
    return chrono.parseDate(date_string, now_as_reference_date, {
      forwardDate: true,
    });
  }

  convertToRoughString(date: Date): string {
    let hoursAfterFormatting = date.getHours() % 12;
    if (hoursAfterFormatting === 0) {
      hoursAfterFormatting = 12;
    }
    const timeOfDayModifier = date.getHours() < 12 ? 'AM' : 'PM';

    return (
      hoursAfterFormatting +
      ':' +
      date.getMinutes() +
      ' ' +
      timeOfDayModifier +
      ' on ' +
      date.getMonth() +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear()
    );
  }
}
