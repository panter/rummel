import { Migration } from '@mikro-orm/migrations';

export class Migration20230731144340 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" add column "reuse_potential_note" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" drop column "reuse_potential_note";');
  }

}
