import { Migration } from '@mikro-orm/migrations';

export class Migration20230801104556 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "due_date" timestamptz(0) null, "closed_at" timestamptz(0) null, constraint "task_pkey" primary key ("id"));');

    this.addSql('create table "materials_depot_tasks" ("materials_depot_id" uuid not null, "task_id" uuid not null, constraint "materials_depot_tasks_pkey" primary key ("materials_depot_id", "task_id"));');

    this.addSql('alter table "materials_depot_tasks" add constraint "materials_depot_tasks_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "materials_depot_tasks" add constraint "materials_depot_tasks_task_id_foreign" foreign key ("task_id") references "task" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot_tasks" drop constraint "materials_depot_tasks_task_id_foreign";');

    this.addSql('drop table if exists "task" cascade;');

    this.addSql('drop table if exists "materials_depot_tasks" cascade;');
  }

}
