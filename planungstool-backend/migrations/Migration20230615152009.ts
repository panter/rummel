import { Migration } from '@mikro-orm/migrations';

export class Migration20230615152009 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "autocomplete" drop constraint "autocomplete_key_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "autocomplete" add constraint "autocomplete_key_unique" unique ("key");');
  }

}
