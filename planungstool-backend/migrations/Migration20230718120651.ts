import { Migration } from '@mikro-orm/migrations';

export class Migration20230718120651 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" add column "description" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category" drop column "description";');
  }

}
