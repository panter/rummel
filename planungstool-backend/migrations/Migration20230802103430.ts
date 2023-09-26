import { Migration } from '@mikro-orm/migrations';

export class Migration20230802103430 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" add column "sort_order" int null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "category" drop column "sort_order";');
  }

}
