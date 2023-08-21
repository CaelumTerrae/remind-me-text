import { Test, TestingModule } from '@nestjs/testing';
import { TimeparserService } from './timeparser.service';

describe('TimeparserService', () => {
  let service: TimeparserService;
  const now_in_ms = Date.now();
  const now = new Date(Date.now());

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeparserService],
    }).compile();

    service = module.get<TimeparserService>(TimeparserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should properly handle relative dates in  days', () => {
    // mock now to make sure that time changing doesn't change anything
    jest.spyOn(global.Date, 'now').mockImplementation(() => now_in_ms);
    const one_day_from_now_from_service = service.convertToTimeDelta('1 Day');
    const one_day_from_now_calculated = addDays(now, 1);
    expect(one_day_from_now_from_service.getMilliseconds()).toEqual(
      one_day_from_now_calculated.getMilliseconds(),
    );

    const three_days_from_now_from_service =
      service.convertToTimeDelta('3 Days');
    const three_days_from_now_calculated = addDays(now, 3);
    expect(three_days_from_now_from_service.getMilliseconds()).toEqual(
      three_days_from_now_calculated.getMilliseconds(),
    );

    const ten_days_from_now_from_service =
      service.convertToTimeDelta('10 Days');
    const ten_days_from_now_calculated = addDays(now, 10);
    expect(ten_days_from_now_from_service.getMilliseconds()).toEqual(
      ten_days_from_now_calculated.getMilliseconds(),
    );

    const one_hundred_days_from_now_from_service =
      service.convertToTimeDelta('100 Days');
    const one_hundred_days_from_now_calculated = addDays(now, 100);
    expect(one_hundred_days_from_now_from_service.getMilliseconds()).toEqual(
      one_hundred_days_from_now_calculated.getMilliseconds(),
    );
  });
});

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
