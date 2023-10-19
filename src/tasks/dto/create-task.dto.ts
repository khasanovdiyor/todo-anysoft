import { MaxLength, Max } from 'class-validator';

export class CreateTaskDto {
  @MaxLength(255)
  title: string;

  @Max(20)
  story_points: number;
}
