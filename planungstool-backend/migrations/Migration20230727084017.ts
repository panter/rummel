import { Migration } from '@mikro-orm/migrations';

export class Migration20230727084017 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "materials_depot" drop constraint "materials_depot_main_image_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot" add constraint "materials_depot_main_image_id_unique" unique ("main_image_id");');
  }

}
