import { Migration } from '@mikro-orm/migrations';

export class Migration20230602212219 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "permission_subject" ("id" uuid not null, "name" varchar(255) not null, constraint "permission_subject_pkey" primary key ("id"));');

    this.addSql('create table "permission" ("id" uuid not null, "action" varchar(255) not null, "subject_id" uuid not null, "condition" jsonb null, constraint "permission_pkey" primary key ("id"));');

    this.addSql('create table "role" ("id" uuid not null, "name" varchar(255) not null, constraint "role_pkey" primary key ("id"));');

    this.addSql('create table "role_permissions" ("permission_id" uuid not null, "role_id" uuid not null, constraint "role_permissions_pkey" primary key ("permission_id", "role_id"));');

    this.addSql('create table "user_authority" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "role_id" uuid not null, constraint "user_authority_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_authority_id" uuid not null, "verified_at" timestamptz(0) null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_user_authority_id_unique" unique ("user_authority_id");');

    this.addSql('alter table "permission" add constraint "permission_subject_id_foreign" foreign key ("subject_id") references "permission_subject" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_authority" add constraint "user_authority_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_user_authority_id_foreign" foreign key ("user_authority_id") references "user_authority" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "permission" drop constraint "permission_subject_id_foreign";');

    this.addSql('alter table "role_permissions" drop constraint "role_permissions_permission_id_foreign";');

    this.addSql('alter table "role_permissions" drop constraint "role_permissions_role_id_foreign";');

    this.addSql('alter table "user_authority" drop constraint "user_authority_role_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_user_authority_id_foreign";');

    this.addSql('drop table if exists "permission_subject" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "role_permissions" cascade;');

    this.addSql('drop table if exists "user_authority" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
