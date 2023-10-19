import { Knex } from 'knex';
import { TaskStatuses } from '../../tasks/entities/task.entity';

const TaskStatusesArr = Array.from(Object.values(TaskStatuses));

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', function (table) {
    table.increments('id');
    table.string('title', 255).notNullable();
    table.string('description', 255).nullable();
    table.enum('status', TaskStatusesArr).defaultTo(TaskStatuses.Todo);
    table.integer('order_id').nullable();
    table.integer('story_points').nullable();
    table.boolean('soft_delete').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tasks');
}
