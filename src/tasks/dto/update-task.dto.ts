import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus, TaskStatuses } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsPositive()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsPositive()
  @IsOptional()
  order_id?: number;

  @IsEnum(TaskStatuses)
  @IsOptional()
  status?: TaskStatus;

  @IsBoolean()
  @IsOptional()
  soft_delete?: boolean = false;
}
