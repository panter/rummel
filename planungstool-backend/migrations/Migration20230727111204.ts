import { Migration } from '@mikro-orm/migrations';

export class Migration20230727111204 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" add column "main_image_id" uuid null;');
    this.addSql('alter table "building_component" add constraint "building_component_main_image_id_foreign" foreign key ("main_image_id") references "asset" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" drop constraint "building_component_main_image_id_foreign";');

    this.addSql('alter table "building_component" drop column "main_image_id";');
  }

}
