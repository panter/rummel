import { Migration } from '@mikro-orm/migrations';

export class Migration20230625232604 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "materials_depot" ("id" uuid not null, "short_name" varchar(255) not null, "name" varchar(255) not null, "google_maps_link" varchar(255) null, "complex" varchar(255) null, "notes" varchar(255) null, "history_notes" varchar(255) null, "typology" varchar(255) null, "intervention_depth" varchar(255) null, "phase" varchar(255) null, "re_use_rating" int null, "construction_year" int null, "construction_year_exact" boolean null, "responsable_user" varchar(255) null, "country" varchar(255) not null default \'CH\', "city" varchar(255) null, "postal_code" varchar(255) null, "street" varchar(255) null, constraint "materials_depot_pkey" primary key ("id"));');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_short_name_unique" unique ("short_name");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "materials_depot" cascade;');
  }

}
