import { Migration } from '@mikro-orm/migrations';

export class Migration20230731060453 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "search_request_assets" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "asset_id" uuid not null, "tenant" varchar(255) null default \'tenant:zirkular\', "search_request_id" uuid null, "tags" text[] null, constraint "search_request_assets_pkey" primary key ("id"));');
    this.addSql('alter table "search_request_assets" add constraint "search_request_assets_asset_id_unique" unique ("asset_id");');

    this.addSql('alter table "search_request_assets" add constraint "search_request_assets_asset_id_foreign" foreign key ("asset_id") references "asset" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "search_request_assets" add constraint "search_request_assets_search_request_id_foreign" foreign key ("search_request_id") references "search_request" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "search_request" add column "concept" varchar(255) null, add column "co2total" int null, add column "co2total_exact" boolean null, add column "co2per_unit" int null, add column "co2per_unit_exact" boolean null, add column "co2balance_description" text null, add column "budget_in_rappens" int null, add column "status_hunting" varchar(255) null, add column "fire_protection" varchar(255) null, add column "sound_proof" varchar(255) null, add column "security" varchar(255) null, add column "storage_location" varchar(255) null, add column "location_building" varchar(255) null, add column "fallback_level" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "search_request_assets" cascade;');

    this.addSql('alter table "search_request" drop column "concept";');
    this.addSql('alter table "search_request" drop column "co2total";');
    this.addSql('alter table "search_request" drop column "co2total_exact";');
    this.addSql('alter table "search_request" drop column "co2per_unit";');
    this.addSql('alter table "search_request" drop column "co2per_unit_exact";');
    this.addSql('alter table "search_request" drop column "co2balance_description";');
    this.addSql('alter table "search_request" drop column "budget_in_rappens";');
    this.addSql('alter table "search_request" drop column "status_hunting";');
    this.addSql('alter table "search_request" drop column "fire_protection";');
    this.addSql('alter table "search_request" drop column "sound_proof";');
    this.addSql('alter table "search_request" drop column "security";');
    this.addSql('alter table "search_request" drop column "storage_location";');
    this.addSql('alter table "search_request" drop column "location_building";');
    this.addSql('alter table "search_request" drop column "fallback_level";');
  }

}
