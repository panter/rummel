import { Migration } from '@mikro-orm/migrations';

export class Migration20230629085058 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "materials_depot" add column "ebkph_category_id" uuid null;');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_ebkph_category_id_foreign" foreign key ("ebkph_category_id") references "ebkph-category" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot" drop constraint "materials_depot_ebkph_category_id_foreign";');

    this.addSql('alter table "materials_depot" drop column "ebkph_category_id";');
  }

}
