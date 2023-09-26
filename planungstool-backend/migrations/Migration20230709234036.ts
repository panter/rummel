import { Migration } from '@mikro-orm/migrations';

export class Migration20230709234036 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dimension" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "width" int null, "height" int null, "depth" int null, "is_exact" boolean null, constraint "dimension_pkey" primary key ("id"));');

    this.addSql('create table "materials_depot_dimensions" ("materials_depot_id" uuid not null, "dimension_id" uuid not null, constraint "materials_depot_dimensions_pkey" primary key ("materials_depot_id", "dimension_id"));');

    this.addSql('alter table "materials_depot_dimensions" add constraint "materials_depot_dimensions_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "materials_depot_dimensions" add constraint "materials_depot_dimensions_dimension_id_foreign" foreign key ("dimension_id") references "dimension" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot_dimensions" drop constraint "materials_depot_dimensions_dimension_id_foreign";');

    this.addSql('drop table if exists "dimension" cascade;');

    this.addSql('drop table if exists "materials_depot_dimensions" cascade;');
  }

}
