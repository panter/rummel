import { Migration } from '@mikro-orm/migrations';

export class Migration20230712202042 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "asset" rename column "mimetype" to "mime_type";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "asset" rename column "mime_type" to "mimetype";');
  }

}
