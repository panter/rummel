import { Migration } from '@mikro-orm/migrations';

export class Migration20230709234729 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dimension" add column "type" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dimension" drop column "type";');
  }

}
