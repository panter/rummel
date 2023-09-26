import { Migration } from '@mikro-orm/migrations';

export class Migration20230628225815 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "materials_depot_categories" ("materials_depot_id" uuid not null, "category_id" uuid not null, constraint "materials_depot_categories_pkey" primary key ("materials_depot_id", "category_id"));');

    this.addSql('alter table "materials_depot_categories" add constraint "materials_depot_categories_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "materials_depot_categories" add constraint "materials_depot_categories_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "materials_depot_categories" cascade;');
  }

}
