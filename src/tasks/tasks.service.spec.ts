import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksDao } from './tasks.dao';
import { NotFoundError } from './errors/not-found.error';

const createMockTasksDao = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('TasksService', () => {
  let service: TasksService;
  let tasksDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksDao,
          useValue: createMockTasksDao(),
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    tasksDao = module.get<TasksDao>(TasksDao);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    const id = 1;

    describe('when task with ID exists', () => {
      it('should return the task object', async () => {
        const expectedTask = {};

        tasksDao.findOne.mockReturnValue(expectedTask);
        const task = await service.findOne(id);
        expect(task).toEqual(expectedTask);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundError"', async () => {
        tasksDao.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundError);
          expect(err.message).toEqual(`Task with id ${id} not found`);
        }
      });
    });
  });
});
