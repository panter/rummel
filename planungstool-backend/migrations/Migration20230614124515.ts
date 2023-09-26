import { Migration } from '@mikro-orm/migrations';

export class Migration20230614124515 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "asset" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "access" text check ("access" in (\'public\', \'private\')) not null, "mimetype" varchar(255) not null, "original_filename" varchar(255) not null, "size" bigint not null, "storage" varchar(255) not null, "url" varchar(255) null, "confirmed_at" timestamptz(0) null, "tenant" varchar(255) not null, constraint "asset_pkey" primary key ("id"));');

    this.addSql('create table "autocomplete" ("key" varchar(255) not null, "value" varchar(255) not null, constraint "autocomplete_pkey" primary key ("key"));');

    this.addSql('create table "postal_code" ("postal_code" varchar(255) not null, "canton" varchar(255) not null, "description" varchar(255) not null, constraint "postal_code_pkey" primary key ("postal_code"));');

    this.addSql('alter table "role_permissions" drop constraint "role_permissions_pkey";');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_pkey" primary key ("role_id", "permission_id");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "asset" cascade;');

    this.addSql('drop table if exists "autocomplete" cascade;');

    this.addSql('drop table if exists "postal_code" cascade;');

    this.addSql('alter table "role_permissions" drop constraint "role_permissions_pkey";');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_pkey" primary key ("permission_id", "role_id");');
  }

}
