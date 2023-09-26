import { Migration } from '@mikro-orm/migrations';

export class Migration20230623213002 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "ebkph-category" ("id" uuid not null, "name" varchar(255) not null, "note" varchar(255) not null, "parent_id" uuid null, constraint "ebkph-category_pkey" primary key ("id"));');
    this.addSql('alter table "ebkph-category" add constraint "ebkph-category_name_unique" unique ("name");');

    this.addSql('alter table "ebkph-category" add constraint "ebkph-category_parent_id_foreign" foreign key ("parent_id") references "ebkph-category" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ebkph-category" drop constraint "ebkph-category_parent_id_foreign";');

    this.addSql('drop table if exists "ebkph-category" cascade;');
  }

}
