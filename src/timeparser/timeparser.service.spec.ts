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
    // mock now to make sure that time changing doesn't change anything
    jest.spyOn(global.Date, 'now').mockImplementation(() => now_in_ms);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle relative days', () => {
    const one_day_from_now_from_service = service.convertToTimeDelta('1 Day');
    const one_day_from_now_calculated = addDays(now, 1);
    expect(one_day_from_now_from_service.getMilliseconds()).toEqual(
      one_day_from_now_calculated.getMilliseconds(),
    );

    const one_day_from_now_verbose_from_service =
      service.convertToTimeDelta('1 day from now');
    expect(one_day_from_now_verbose_from_service.getMilliseconds()).toEqual(
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

  it('should handle adhoc relative time words', () => {
    const tomorrow_service = service.convertToTimeDelta('tomorrow');
    const tomorrow_calculated = addDays(now, 1);
    expect(tomorrow_service.getMilliseconds()).toEqual(
      tomorrow_calculated.getMilliseconds(),
    );

    const next_week_service = service.convertToTimeDelta('next week');
    const next_week_calculated = addDays(now, 7);
    expect(next_week_service.getMilliseconds()).toEqual(
      next_week_calculated.getMilliseconds(),
    );

    const next_year_service = service.convertToTimeDelta('next year');
    const next_year_calculated = addYears(now, 1);
    expect(next_year_service.getMilliseconds()).toEqual(
      next_year_calculated.getMilliseconds(),
    );
  });

  it('should handle relative weeks', () => {
    const one_week_from_now_service = service.convertToTimeDelta('1 week');
    const one_week_from_now_calculated = addDays(now, 7);
    expect(one_week_from_now_service.getMilliseconds()).toEqual(
      one_week_from_now_calculated.getMilliseconds(),
    );

    const one_week_from_now_service_verbose =
      service.convertToTimeDelta('a week from now');
    expect(one_week_from_now_service_verbose.getMilliseconds()).toEqual(
      one_week_from_now_calculated.getMilliseconds(),
    );
  });

  it('should handle relative years', () => {
    const one_year_from_now_service = service.convertToTimeDelta('1 year');
    const one_year_from_now_calculated = addYears(now, 1);
    expect(one_year_from_now_service.getMilliseconds()).toEqual(
      one_year_from_now_calculated.getMilliseconds(),
    );

    const two_years_from_now_service = service.convertToTimeDelta('1 year');
    const two_years_from_now_calculated = addYears(now, 2);
    expect(two_years_from_now_service.getMilliseconds()).toEqual(
      two_years_from_now_calculated.getMilliseconds(),
    );
  });

  it('should identify messages with dates', () => {
    expect(
      service.doesStringHaveATimeDelta(
        'hey dude do you have a thingy by any chance',
      ),
    ).toEqual(false);

    expect(service.doesStringHaveATimeDelta('this isnt a date')).toEqual(false);
  });

  it('should identify messages without dates', () => {
    expect(
      service.doesStringHaveATimeDelta(
        'this is a lot of other words and 1 year from now',
      ),
    ).toEqual(true);

    expect(
      service.doesStringHaveATimeDelta(
        'a lot of words in a diff order and 15 days',
      ),
    ).toEqual(true);
  });
});

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addYears = (date: Date, years: number) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};
