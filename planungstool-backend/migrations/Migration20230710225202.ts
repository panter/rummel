import { Migration } from '@mikro-orm/migrations';

export class Migration20230710225202 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "project" add column "short_name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "project" drop column "short_name";');
  }

}
