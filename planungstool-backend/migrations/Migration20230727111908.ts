import { Migration } from '@mikro-orm/migrations';

export class Migration20230727111908 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "project" add column "main_image_id" uuid null;');
    this.addSql('alter table "project" add constraint "project_main_image_id_foreign" foreign key ("main_image_id") references "asset" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "project" drop constraint "project_main_image_id_foreign";');

    this.addSql('alter table "project" drop column "main_image_id";');
  }

}
