import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundError } from './errors/not-found.error';
import { WebsocketExceptionsFilter } from '../common/exception-filters/ws-exception.filter';

@UseFilters(WebsocketExceptionsFilter)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksGateway {
  constructor(private readonly tasksService: TasksService) {}

  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log(`Client Connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client Disconnected: ${client.id}`);
  }

  @SubscribeMessage('tasks:create')
  async create(@MessageBody() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    console.log('task: created', task);
    return { data: task };
  }

  @SubscribeMessage('tasks:list')
  async findAll() {
    const tasks = await this.tasksService.findAll();
    return { data: tasks };
  }

  @SubscribeMessage('tasks:read')
  async findOne(@MessageBody('id') id: number) {
    try {
      console.log(id);
      const task = await this.tasksService.findOne(id);
      console.log('task: ', task);
      return { data: task };
    } catch (err) {
      if (err instanceof NotFoundError) throw new WsException(err.message);
    }
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('tasks:update')
  async update(@MessageBody() updateTaskDto: UpdateTaskDto) {
    try {
      const tasks = await this.tasksService.update(
        updateTaskDto.id,
        updateTaskDto,
      );
      return { data: tasks };
    } catch (err) {
      if (err instanceof NotFoundError) throw new WsException(err.message);
    }
  }

  @SubscribeMessage('tasks:remove')
  async remove(
    @MessageBody('id') id: number,
    @MessageBody('soft_delete') soft_delete: boolean,
  ) {
    try {
      const tasks = await this.tasksService.remove(id, { soft_delete });
      return { data: tasks };
    } catch (err) {
      if (err instanceof NotFoundError) throw new WsException(err.message);
    }
  }
}
