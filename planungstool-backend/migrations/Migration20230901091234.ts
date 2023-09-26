import { Migration } from '@mikro-orm/migrations';

export class Migration20230901091234 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "contact" alter column "notes" type text using ("notes"::text);');

    this.addSql('alter table "task" alter column "name" type text using ("name"::text);');

    this.addSql('alter table "materials_depot" add column "external_id" varchar(255) null;');
    this.addSql('alter table "materials_depot" alter column "google_maps_link" type text using ("google_maps_link"::text);');
    this.addSql('alter table "materials_depot" alter column "notes" type text using ("notes"::text);');
    this.addSql('alter table "materials_depot" alter column "history_notes" type text using ("history_notes"::text);');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_external_id_unique" unique ("external_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "contact" alter column "notes" type varchar using ("notes"::varchar);');

    this.addSql('alter table "materials_depot" alter column "google_maps_link" type varchar using ("google_maps_link"::varchar);');
    this.addSql('alter table "materials_depot" alter column "notes" type varchar using ("notes"::varchar);');
    this.addSql('alter table "materials_depot" alter column "history_notes" type varchar using ("history_notes"::varchar);');
    this.addSql('alter table "materials_depot" drop constraint "materials_depot_external_id_unique";');
    this.addSql('alter table "materials_depot" drop column "external_id";');

    this.addSql('alter table "task" alter column "name" type varchar using ("name"::varchar);');
  }

}
