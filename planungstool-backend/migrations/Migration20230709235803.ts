import { Migration } from '@mikro-orm/migrations';

export class Migration20230709235803 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "building_component_dimensions" ("building_component_id" uuid not null, "dimension_id" uuid not null, constraint "building_component_dimensions_pkey" primary key ("building_component_id", "dimension_id"));');

    this.addSql('alter table "building_component_dimensions" add constraint "building_component_dimensions_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "building_component_dimensions" add constraint "building_component_dimensions_dimension_id_foreign" foreign key ("dimension_id") references "dimension" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "materials_depot_dimensions" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "materials_depot_dimensions" ("materials_depot_id" uuid not null default null, "dimension_id" uuid not null default null, constraint "materials_depot_dimensions_pkey" primary key ("materials_depot_id", "dimension_id"));');

    this.addSql('alter table "materials_depot_dimensions" add constraint "materials_depot_dimensions_dimension_id_foreign" foreign key ("dimension_id") references "dimension" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "materials_depot_dimensions" add constraint "materials_depot_dimensions_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "building_component_dimensions" cascade;');
  }

}
