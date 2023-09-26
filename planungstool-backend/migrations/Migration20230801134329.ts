import { Migration } from '@mikro-orm/migrations';

export class Migration20230801134329 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "materials_depot_timeline" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "description" varchar(255) not null, "start_date" timestamptz(0) null, "end_date" timestamptz(0) null, "materials_depot_id" uuid not null, constraint "materials_depot_timeline_pkey" primary key ("id"));');

    this.addSql('alter table "materials_depot_timeline" add constraint "materials_depot_timeline_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "materials_depot_timeline" cascade;');
  }

}
