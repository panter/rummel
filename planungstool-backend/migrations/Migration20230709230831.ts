import { Migration } from '@mikro-orm/migrations';

export class Migration20230709230831 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "contact" add column "first_line" varchar(255) null, add column "contact1" varchar(255) null, add column "contact2" varchar(255) null, add column "notes" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "contact" drop column "first_line";');
    this.addSql('alter table "contact" drop column "contact1";');
    this.addSql('alter table "contact" drop column "contact2";');
    this.addSql('alter table "contact" drop column "notes";');
  }

}
