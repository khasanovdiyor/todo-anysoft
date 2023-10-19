import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksDao } from './tasks.dao';
import { NotFoundError } from './errors/not-found.error';

@Injectable()
export class TasksService {
  constructor(private readonly tasksDao: TasksDao) {}
  create(createTaskDto: CreateTaskDto) {
    return this.tasksDao.create(createTaskDto);
  }

  findAll() {
    return this.tasksDao.findAll();
  }

  async findOne(id: number) {
    const task = await this.tasksDao.findOne(id);
    if (!task) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);
    return this.tasksDao.update(id, updateTaskDto);
  }

  remove(id: number, updateTaskDto: UpdateTaskDto) {
    if (updateTaskDto?.soft_delete) {
      return this.update(id, { soft_delete: true });
    }
    return this.tasksDao.remove(id);
  }
}
