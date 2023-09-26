import { Migration } from '@mikro-orm/migrations';

export class Migration20230710093616 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "materials_depot_categories" cascade;');

    this.addSql('alter table "materials_depot" drop constraint "materials_depot_ebkph_category_id_foreign";');

    this.addSql('alter table "materials_depot" drop column "ebkph_category_id";');
  }

  async down(): Promise<void> {
    this.addSql('create table "materials_depot_categories" ("materials_depot_id" uuid not null default null, "category_id" uuid not null default null, constraint "materials_depot_categories_pkey" primary key ("materials_depot_id", "category_id"));');

    this.addSql('alter table "materials_depot_categories" add constraint "materials_depot_categories_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "materials_depot_categories" add constraint "materials_depot_categories_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "materials_depot" add column "ebkph_category_id" uuid null default null;');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_ebkph_category_id_foreign" foreign key ("ebkph_category_id") references "ebkph-category" ("id") on update cascade on delete set null;');
  }

}
