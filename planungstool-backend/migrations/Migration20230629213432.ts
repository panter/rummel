import { Migration } from '@mikro-orm/migrations';

export class Migration20230629213432 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "building_component" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "identification" varchar(255) not null, "name" varchar(255) null, "description" varchar(255) null, "notes" varchar(255) null, "quantity" int null, "quantity_exact" boolean null, "construction_year" int null, "construction_year_exact" boolean null, "co2savings" int null, "co2savings_exact" boolean null, "materials_depot_id" uuid not null, "ebkph_category_id" uuid null, "location_in_building" varchar(255) null, "location_in_building_detail" varchar(255) null, "show_in_matching" boolean not null default false, constraint "building_component_pkey" primary key ("id"));');
    this.addSql('alter table "building_component" add constraint "building_component_identification_unique" unique ("identification");');

    this.addSql('create table "building_component_categories" ("building_component_id" uuid not null, "category_id" uuid not null, constraint "building_component_categories_pkey" primary key ("building_component_id", "category_id"));');

    this.addSql('alter table "building_component" add constraint "building_component_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade;');
    this.addSql('alter table "building_component" add constraint "building_component_ebkph_category_id_foreign" foreign key ("ebkph_category_id") references "ebkph-category" ("id") on update cascade on delete set null;');

    this.addSql('alter table "building_component_categories" add constraint "building_component_categories_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "building_component_categories" add constraint "building_component_categories_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component_categories" drop constraint "building_component_categories_building_component_id_foreign";');

    this.addSql('drop table if exists "building_component" cascade;');

    this.addSql('drop table if exists "building_component_categories" cascade;');
  }

}
