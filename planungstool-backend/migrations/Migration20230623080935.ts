import { Migration } from '@mikro-orm/migrations';

export class Migration20230623080935 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" uuid not null, "name" varchar(255) not null, "parent_id" uuid null, constraint "category_pkey" primary key ("id"));');
    this.addSql('alter table "category" add constraint "category_name_unique" unique ("name");');

    this.addSql('alter table "category" add constraint "category_parent_id_foreign" foreign key ("parent_id") references "category" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category" drop constraint "category_parent_id_foreign";');

    this.addSql('drop table if exists "category" cascade;');
  }

}
