import { Migration } from '@mikro-orm/migrations';

export class Migration20231007202954 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "address" ("id" uuid not null, "address" varchar(255) not null, constraint "address_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "simple" ("id" uuid not null, "name" varchar(255) null, "second_name" varchar(255) null, "related_id" uuid not null, constraint "simple_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "simple" add constraint "simple_related_id_unique" unique ("related_id");',
    );

    this.addSql(
      'create table "organisation" ("id" uuid not null, "description" varchar(255) null, "simple_id" uuid null, constraint "organisation_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "person" ("id" uuid not null, "name" varchar(255) not null, "organisation_id" uuid null, constraint "person_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "person_addresses" ("person_id" uuid not null, "address_id" uuid not null, constraint "person_addresses_pkey" primary key ("person_id", "address_id"));',
    );

    this.addSql(
      'alter table "simple" add constraint "simple_related_id_foreign" foreign key ("related_id") references "simple" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "organisation" add constraint "organisation_simple_id_foreign" foreign key ("simple_id") references "simple" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "person" add constraint "person_organisation_id_foreign" foreign key ("organisation_id") references "organisation" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "person_addresses" add constraint "person_addresses_person_id_foreign" foreign key ("person_id") references "person" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "person_addresses" add constraint "person_addresses_address_id_foreign" foreign key ("address_id") references "address" ("id") on update cascade on delete cascade;',
    );

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "person_addresses" drop constraint "person_addresses_address_id_foreign";',
    );

    this.addSql(
      'alter table "simple" drop constraint "simple_related_id_foreign";',
    );

    this.addSql(
      'alter table "organisation" drop constraint "organisation_simple_id_foreign";',
    );

    this.addSql(
      'alter table "person" drop constraint "person_organisation_id_foreign";',
    );

    this.addSql(
      'alter table "person_addresses" drop constraint "person_addresses_person_id_foreign";',
    );

    this.addSql(
      'create table "user" ("id" serial primary key, "name" varchar not null default null);',
    );

    this.addSql('drop table if exists "address" cascade;');

    this.addSql('drop table if exists "simple" cascade;');

    this.addSql('drop table if exists "organisation" cascade;');

    this.addSql('drop table if exists "person" cascade;');

    this.addSql('drop table if exists "person_addresses" cascade;');
  }
}
