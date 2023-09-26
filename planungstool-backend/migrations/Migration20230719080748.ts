import { Migration } from '@mikro-orm/migrations';

export class Migration20230719080748 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ebkph-category" rename column "note" to "description";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ebkph-category" rename column "description" to "note";');
  }

}
