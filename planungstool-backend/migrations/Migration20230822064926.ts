import { Migration } from '@mikro-orm/migrations';

export class Migration20230822064926 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "search_request_interest" add column "notes" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "search_request_interest" drop column "notes";');
  }

}
