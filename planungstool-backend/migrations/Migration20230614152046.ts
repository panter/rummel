import { Migration } from '@mikro-orm/migrations';

export class Migration20230614152046 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "autocomplete" add column "id" uuid not null;');
    this.addSql('alter table "autocomplete" drop constraint "autocomplete_pkey";');
    this.addSql('alter table "autocomplete" add constraint "autocomplete_key_unique" unique ("key");');
    this.addSql('alter table "autocomplete" add constraint "autocomplete_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "autocomplete" drop constraint "autocomplete_key_unique";');
    this.addSql('alter table "autocomplete" drop constraint "autocomplete_pkey";');
    this.addSql('alter table "autocomplete" drop column "id";');
    this.addSql('alter table "autocomplete" add constraint "autocomplete_pkey" primary key ("key");');
  }

}
