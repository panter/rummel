import { Migration } from '@mikro-orm/migrations';

export class Migration20230626064613 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ebkph-category" alter column "note" type varchar(255) using ("note"::varchar(255));');
    this.addSql('alter table "ebkph-category" alter column "note" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ebkph-category" alter column "note" type varchar using ("note"::varchar);');
    this.addSql('alter table "ebkph-category" alter column "note" set not null;');
  }

}
