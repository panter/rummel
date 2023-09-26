import { Migration } from '@mikro-orm/migrations';

export class Migration20230710100845 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "building_component_categories" cascade;');

    this.addSql('alter table "building_component" add column "category_id" uuid null;');
    this.addSql('alter table "building_component" add constraint "building_component_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('create table "building_component_categories" ("building_component_id" uuid not null default null, "category_id" uuid not null default null, constraint "building_component_categories_pkey" primary key ("building_component_id", "category_id"));');

    this.addSql('alter table "building_component_categories" add constraint "building_component_categories_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "building_component_categories" add constraint "building_component_categories_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "building_component" drop constraint "building_component_category_id_foreign";');

    this.addSql('alter table "building_component" drop column "category_id";');
  }

}
