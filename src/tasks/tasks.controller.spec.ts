import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

const createMockTasksService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('TasksController', () => {
  let controller: TasksController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: TasksService,
          useValue: createMockTasksService(),
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    const id = 1;

    describe('when task with ID exists', () => {
      it('should return the task object', async () => {
        const expectedTask = {};

        service.findOne.mockReturnValue(expectedTask);
        const task = await service.findOne(id);
        expect(task).toEqual(expectedTask);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        service.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(id);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Task with id ${id} not found`);
        }
      });
    });
  });
});
