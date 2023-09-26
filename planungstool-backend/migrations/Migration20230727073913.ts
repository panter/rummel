import { Migration } from '@mikro-orm/migrations';

export class Migration20230727073913 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "materials_depot" add column "main_image_id" uuid null;');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_main_image_id_foreign" foreign key ("main_image_id") references "asset" ("id") on update cascade on delete set null;');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_main_image_id_unique" unique ("main_image_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot" drop constraint "materials_depot_main_image_id_foreign";');

    this.addSql('alter table "materials_depot" drop constraint "materials_depot_main_image_id_unique";');
    this.addSql('alter table "materials_depot" drop column "main_image_id";');
  }

}
