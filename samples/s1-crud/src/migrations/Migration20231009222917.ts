import { Migration } from '@mikro-orm/migrations';

export class Migration20231009222917 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "autocomplete" ("id" uuid not null, "key" varchar(255) not null, "value" varchar(255) not null, constraint "autocomplete_pkey" primary key ("id"));');

    this.addSql('drop table if exists "user" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "name" varchar not null default null);');

    this.addSql('drop table if exists "autocomplete" cascade;');
  }

}
