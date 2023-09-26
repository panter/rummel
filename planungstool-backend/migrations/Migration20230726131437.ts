import { Migration } from '@mikro-orm/migrations';

export class Migration20230726131437 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "materials_depot" add column "material_depot_fulltext_search" tsvector null;');
    this.addSql('create index "materials_depot_material_depot_fulltext_search_index" on "public"."materials_depot" using gin("material_depot_fulltext_search");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "materials_depot_material_depot_fulltext_search_index";');
    this.addSql('alter table "materials_depot" drop column "material_depot_fulltext_search";');
  }

}
