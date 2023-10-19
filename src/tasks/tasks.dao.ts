import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from '../knex';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksDao {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  create(createTaskDto: CreateTaskDto) {
    return this.knex<Task>('tasks').insert(createTaskDto).returning('*');
  }

  findAll() {
    return this.knex<Task>('tasks').select('*').where({ soft_delete: false });
  }

  findOne(id: number) {
    return this.knex<Task>('tasks')
      .select('*')
      .where({ id, soft_delete: false })
      .first();
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.knex<Task>('tasks')
      .where({ id })
      .update(updateTaskDto)
      .returning('*');
  }

  remove(id: number) {
    return this.knex<Task>('tasks').where({ id }).del();
  }
}
