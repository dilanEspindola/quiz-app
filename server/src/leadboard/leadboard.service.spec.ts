import { Test, TestingModule } from '@nestjs/testing';
import { LeadboardService } from './leadboard.service';

describe('LeadboardService', () => {
  let service: LeadboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadboardService],
    }).compile();

    service = module.get<LeadboardService>(LeadboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
