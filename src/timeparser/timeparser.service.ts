import { Injectable } from '@nestjs/common';
import * as chrono from 'chrono-node';

@Injectable()
export class TimeparserService {
  constructor() {}

  convertToTimeDelta(date_string: string) {
    const now_as_reference_date = new Date(Date.now());
    return chrono.parseDate(date_string, now_as_reference_date, {
      forwardDate: true,
    });
  }
}
