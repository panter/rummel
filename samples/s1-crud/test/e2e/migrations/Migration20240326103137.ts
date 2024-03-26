import { Migration } from '@mikro-orm/migrations';

export class Migration20240326103137 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "address" ("id" uuid not null, "address" varchar(255) not null, constraint "address_pkey" primary key ("id"));');

    this.addSql('create table "app_role" ("name" varchar(255) not null, "is_default" boolean not null default false, constraint "app_role_pkey" primary key ("name"));');

    this.addSql('create table "app_user" ("id" uuid not null, "email" varchar(255) not null, "role_name" varchar(255) not null, "personal_token" varchar(255) null, constraint "app_user_pkey" primary key ("id"));');
    this.addSql('alter table "app_user" add constraint "app_user_email_unique" unique ("email");');
    this.addSql('alter table "app_user" add constraint "app_user_personal_token_unique" unique ("personal_token");');

    this.addSql('create table "autocomplete" ("id" uuid not null, "key" varchar(255) not null, "value" varchar(255) not null, constraint "autocomplete_pkey" primary key ("id"));');

    this.addSql('create table "permission" ("action" varchar(255) not null, "subject" varchar(255) not null, "condition" jsonb null, constraint "permission_pkey" primary key ("action", "subject"));');

    this.addSql('create table "app_role_permissions" ("app_role_name" varchar(255) not null, "permission_action" varchar(255) not null, "permission_subject" varchar(255) not null, constraint "app_role_permissions_pkey" primary key ("app_role_name", "permission_action", "permission_subject"));');

    this.addSql('create table "permission_roles" ("permission_action" varchar(255) not null, "permission_subject" varchar(255) not null, "app_role_name" varchar(255) not null, constraint "permission_roles_pkey" primary key ("permission_action", "permission_subject", "app_role_name"));');

    this.addSql('create table "simple" ("id" uuid not null, "name" varchar(255) null, "second_name" varchar(255) null, "related_id" uuid not null, constraint "simple_pkey" primary key ("id"));');
    this.addSql('alter table "simple" add constraint "simple_related_id_unique" unique ("related_id");');

    this.addSql('create table "organisation" ("id" uuid not null, "description" varchar(255) null, "simple_id" uuid null, constraint "organisation_pkey" primary key ("id"));');

    this.addSql('create table "person" ("id" uuid not null, "name" varchar(255) not null, "organisation_id" uuid null, "meta" jsonb null, constraint "person_pkey" primary key ("id"));');

    this.addSql('create table "person_addresses" ("person_id" uuid not null, "address_id" uuid not null, constraint "person_addresses_pkey" primary key ("person_id", "address_id"));');

    this.addSql('alter table "app_user" add constraint "app_user_role_name_foreign" foreign key ("role_name") references "app_role" ("name") on update cascade;');

    this.addSql('alter table "app_role_permissions" add constraint "app_role_permissions_app_role_name_foreign" foreign key ("app_role_name") references "app_role" ("name") on update cascade on delete cascade;');
    this.addSql('alter table "app_role_permissions" add constraint "app_role_permissions_permission_action_permission_dd9d3_foreign" foreign key ("permission_action", "permission_subject") references "permission" ("action", "subject") on update cascade on delete cascade;');

    this.addSql('alter table "permission_roles" add constraint "permission_roles_permission_action_permission_subject_foreign" foreign key ("permission_action", "permission_subject") references "permission" ("action", "subject") on update cascade on delete cascade;');
    this.addSql('alter table "permission_roles" add constraint "permission_roles_app_role_name_foreign" foreign key ("app_role_name") references "app_role" ("name") on update cascade on delete cascade;');

    this.addSql('alter table "simple" add constraint "simple_related_id_foreign" foreign key ("related_id") references "simple" ("id") on update cascade;');

    this.addSql('alter table "organisation" add constraint "organisation_simple_id_foreign" foreign key ("simple_id") references "simple" ("id") on update cascade on delete set null;');

    this.addSql('alter table "person" add constraint "person_organisation_id_foreign" foreign key ("organisation_id") references "organisation" ("id") on update cascade on delete set null;');

    this.addSql('alter table "person_addresses" add constraint "person_addresses_person_id_foreign" foreign key ("person_id") references "person" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "person_addresses" add constraint "person_addresses_address_id_foreign" foreign key ("address_id") references "address" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "person_addresses" drop constraint "person_addresses_address_id_foreign";');

    this.addSql('alter table "app_user" drop constraint "app_user_role_name_foreign";');

    this.addSql('alter table "app_role_permissions" drop constraint "app_role_permissions_app_role_name_foreign";');

    this.addSql('alter table "permission_roles" drop constraint "permission_roles_app_role_name_foreign";');

    this.addSql('alter table "app_role_permissions" drop constraint "app_role_permissions_permission_action_permission_dd9d3_foreign";');

    this.addSql('alter table "permission_roles" drop constraint "permission_roles_permission_action_permission_subject_foreign";');

    this.addSql('alter table "simple" drop constraint "simple_related_id_foreign";');

    this.addSql('alter table "organisation" drop constraint "organisation_simple_id_foreign";');

    this.addSql('alter table "person" drop constraint "person_organisation_id_foreign";');

    this.addSql('alter table "person_addresses" drop constraint "person_addresses_person_id_foreign";');

    this.addSql('drop table if exists "address" cascade;');

    this.addSql('drop table if exists "app_role" cascade;');

    this.addSql('drop table if exists "app_user" cascade;');

    this.addSql('drop table if exists "autocomplete" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "app_role_permissions" cascade;');

    this.addSql('drop table if exists "permission_roles" cascade;');

    this.addSql('drop table if exists "simple" cascade;');

    this.addSql('drop table if exists "organisation" cascade;');

    this.addSql('drop table if exists "person" cascade;');

    this.addSql('drop table if exists "person_addresses" cascade;');
  }

}
