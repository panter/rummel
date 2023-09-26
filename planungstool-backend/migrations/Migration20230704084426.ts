import { Migration } from '@mikro-orm/migrations';

export class Migration20230704084426 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "materials_depot_assets" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "asset_id" uuid not null, "tenant" varchar(255) null, "materials_depot_id" uuid null, "tags" text[] null, constraint "materials_depot_assets_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "materials_depot_assets" add constraint "materials_depot_assets_asset_id_unique" unique ("asset_id");',
    );

    this.addSql(
      'alter table "materials_depot_assets" add constraint "materials_depot_assets_asset_id_foreign" foreign key ("asset_id") references "asset" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "materials_depot_assets" add constraint "materials_depot_assets_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "materials_depot_assets" cascade;');
  }
}
