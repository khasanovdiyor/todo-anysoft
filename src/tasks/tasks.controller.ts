import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundError } from './errors/not-found.error';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Task,
  })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Task,
  })
  @ApiNotFoundResponse({ description: 'Task is not found' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.tasksService.findOne(+id);
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new NotFoundException(err.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by id' })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.tasksService.update(+id, updateTaskDto);
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new NotFoundException(err.message);
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a task by id',
    description:
      'Pass soft_delete: true in request body to soft delete, otherwise it will be a hard delete',
  })
  async remove(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.tasksService.remove(+id, updateTaskDto);
    } catch (err) {
      if (err instanceof NotFoundError)
        throw new NotFoundException(err.message);
    }
  }
}
