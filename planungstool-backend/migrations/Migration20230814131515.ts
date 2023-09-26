import { Migration } from '@mikro-orm/migrations';

export class Migration20230814131515 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "storage_location" drop constraint "storage_location_short_name_unique";');
    this.addSql('alter table "storage_location" rename column "short_name" to "name";');
    this.addSql('alter table "storage_location" add constraint "storage_location_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "storage_location" drop constraint "storage_location_name_unique";');
    this.addSql('alter table "storage_location" rename column "name" to "short_name";');
    this.addSql('alter table "storage_location" add constraint "storage_location_short_name_unique" unique ("short_name");');
  }

}
