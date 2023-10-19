import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksDao } from './tasks.dao';
import { TasksGateway } from './tasks.gateway';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksDao, TasksGateway],
})
export class TasksModule {}
