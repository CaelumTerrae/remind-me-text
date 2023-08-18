import { Test, TestingModule } from '@nestjs/testing';
import { RemindmeController } from './remindme.controller';

describe('RemindmeController', () => {
  let controller: RemindmeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemindmeController],
    }).compile();

    controller = module.get<RemindmeController>(RemindmeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
