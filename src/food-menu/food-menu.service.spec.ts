import { Test, TestingModule } from '@nestjs/testing';
import { FoodMenuService } from './food-menu.service';

describe('FoodMenuService', () => {
  let service: FoodMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodMenuService],
    }).compile();

    service = module.get<FoodMenuService>(FoodMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
