import { Migration } from '@mikro-orm/migrations';

export class Migration20230801052249 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" drop column "sort_order";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" add column "sort_order" int4 not null default null;');
  }

}
