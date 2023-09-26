import { Migration } from '@mikro-orm/migrations';

export class Migration20230901133635 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" add column "external_id" varchar(255) null;');
    this.addSql('alter table "building_component" add constraint "building_component_external_id_unique" unique ("external_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" drop constraint "building_component_external_id_unique";');
    this.addSql('alter table "building_component" drop column "external_id";');
  }

}
