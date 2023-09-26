import { Migration } from '@mikro-orm/migrations';

export class Migration20230802063438 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "storage_location" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "short_name" varchar(255) not null, "google_maps_link" varchar(255) null, "notes" varchar(255) null, "country" varchar(255) not null default \'CH\', "city" varchar(255) null, "postal_code" varchar(255) null, "street" varchar(255) null, "main_image_id" uuid null, constraint "storage_location_pkey" primary key ("id"));');
    this.addSql('alter table "storage_location" add constraint "storage_location_short_name_unique" unique ("short_name");');

    this.addSql('create table "storage_location_contacts" ("storage_location_id" uuid not null, "contact_id" uuid not null, constraint "storage_location_contacts_pkey" primary key ("storage_location_id", "contact_id"));');

    this.addSql('create table "storage_location_assets" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "asset_id" uuid not null, "tenant" varchar(255) null default \'tenant:zirkular\', "storage_location_id" uuid null, "tags" text[] null, constraint "storage_location_assets_pkey" primary key ("id"));');
    this.addSql('alter table "storage_location_assets" add constraint "storage_location_assets_asset_id_unique" unique ("asset_id");');

    this.addSql('alter table "storage_location" add constraint "storage_location_main_image_id_foreign" foreign key ("main_image_id") references "asset" ("id") on update cascade on delete set null;');

    this.addSql('alter table "storage_location_contacts" add constraint "storage_location_contacts_storage_location_id_foreign" foreign key ("storage_location_id") references "storage_location" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "storage_location_contacts" add constraint "storage_location_contacts_contact_id_foreign" foreign key ("contact_id") references "contact" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "storage_location_assets" add constraint "storage_location_assets_asset_id_foreign" foreign key ("asset_id") references "asset" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "storage_location_assets" add constraint "storage_location_assets_storage_location_id_foreign" foreign key ("storage_location_id") references "storage_location" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "building_component" add column "storage_location_id" uuid null;');
    this.addSql('alter table "building_component" add constraint "building_component_storage_location_id_foreign" foreign key ("storage_location_id") references "storage_location" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_location_contacts" drop constraint "storage_location_contacts_storage_location_id_foreign";');

    this.addSql('alter table "storage_location_assets" drop constraint "storage_location_assets_storage_location_id_foreign";');

    this.addSql('alter table "building_component" drop constraint "building_component_storage_location_id_foreign";');

    this.addSql('drop table if exists "storage_location" cascade;');

    this.addSql('drop table if exists "storage_location_contacts" cascade;');

    this.addSql('drop table if exists "storage_location_assets" cascade;');

    this.addSql('alter table "building_component" drop column "storage_location_id";');
  }

}
