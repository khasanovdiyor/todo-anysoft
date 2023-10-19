export class Task {
  readonly id: number;
  readonly title: string;
  readonly description: string | null;
  readonly order_id: number | null;
  readonly status: TaskStatus;
  readonly story_point: number;
  readonly soft_delete: boolean;
  readonly created_at: Date;
}

export const TaskStatuses = {
  Todo: 'TODO',
  InProgress: 'INPROGRESS',
  Done: 'DONE',
} as const;

export type TaskStatus = (typeof TaskStatuses)[keyof typeof TaskStatuses];
