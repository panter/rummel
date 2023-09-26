import { Migration } from '@mikro-orm/migrations';

export class Migration20230725094000 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "building_component_assets" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "asset_id" uuid not null, "tenant" varchar(255) null, "building_component_id" uuid null, "tags" text[] null, constraint "building_component_assets_pkey" primary key ("id"));');
    this.addSql('alter table "building_component_assets" add constraint "building_component_assets_asset_id_unique" unique ("asset_id");');

    this.addSql('alter table "building_component_assets" add constraint "building_component_assets_asset_id_foreign" foreign key ("asset_id") references "asset" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "building_component_assets" add constraint "building_component_assets_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "building_component_assets" cascade;');
  }

}
