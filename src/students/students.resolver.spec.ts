import { Test, TestingModule } from '@nestjs/testing';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

describe('StudentsResolver', () => {
  let resolver: StudentsResolver;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsResolver,
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn().mockResolvedValue(''),
            paginate: jest.fn().mockResolvedValue(''),
            findAll: jest.fn().mockResolvedValue(''),
            findOne: jest.fn().mockResolvedValue(''),
            update: jest.fn(),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    resolver = module.get<StudentsResolver>(StudentsResolver);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
