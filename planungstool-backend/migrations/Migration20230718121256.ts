import { Migration } from '@mikro-orm/migrations';

export class Migration20230718121256 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "project_assets" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "asset_id" uuid not null, "tenant" varchar(255) null, "project_id" uuid null, "tags" text[] null, constraint "project_assets_pkey" primary key ("id"));');
    this.addSql('alter table "project_assets" add constraint "project_assets_asset_id_unique" unique ("asset_id");');

    this.addSql('alter table "project_assets" add constraint "project_assets_asset_id_foreign" foreign key ("asset_id") references "asset" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "project_assets" add constraint "project_assets_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "project_assets" cascade;');
  }

}
