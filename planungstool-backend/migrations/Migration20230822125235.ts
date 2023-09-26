import { Migration } from '@mikro-orm/migrations';

export class Migration20230822125235 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "building_component_contacts" ("building_component_id" uuid not null, "contact_id" uuid not null, constraint "building_component_contacts_pkey" primary key ("building_component_id", "contact_id"));');

    this.addSql('alter table "building_component_contacts" add constraint "building_component_contacts_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "building_component_contacts" add constraint "building_component_contacts_contact_id_foreign" foreign key ("contact_id") references "contact" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "building_component" add column "quantity_spare" int null, add column "quantity_notes" text null, add column "spare_parts_notes" text null, add column "construction_year_notes" text null, add column "reuse_potential_notes" text null, add column "reuse_potential_conclusion" text null, add column "reuse_value_per_unit" int null, add column "reuse_value_total" int null, add column "reuse_value_description" text null, add column "ru1explanation" text null, add column "ru2explanation" text null, add column "ru3explanation" text null, add column "ru1per_unit" int null, add column "ru2per_unit" int null, add column "ru3per_unit" int null, add column "ru_per_unit_sum" int null, add column "fallback_level" varchar(255) null, add column "fallback_level_co2per_unit" int null, add column "fallback_level_co2total" int null, add column "co2savings_per_unit" int null, add column "ru1total" int null, add column "ru2total" int null, add column "ru3total" int null, add column "ru_total_sum" int null, add column "co2savings_total" int null, add column "co2unit" text check ("co2unit" in (\'m\', \'m2\', \'m3\', \'lfm\', \'stk\', \'kg\')) null, add column "co2quantity_used" int null, add column "transport_distance_in_km" int null, add column "transport_vehicle_name" varchar(255) null, add column "storage_location_notes" text null, add column "dimensions_notes" varchar(255) null, add column "demolition_phase" varchar(255) null, add column "potential_interests" varchar(255) null, add column "warranty_details" varchar(255) null;');
    this.addSql('alter table "building_component" alter column "description" type text using ("description"::text);');
    this.addSql('alter table "building_component" drop column "reuse_potential_note";');
    this.addSql('alter table "building_component" drop column "notes";');
    this.addSql('alter table "building_component" rename column "harmfull_substances" to "harmful_substances";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "building_component_contacts" cascade;');

    this.addSql('alter table "building_component" add column "reuse_potential_note" varchar null default null, add column "notes" varchar null default null;');
    this.addSql('alter table "building_component" alter column "description" type varchar using ("description"::varchar);');
    this.addSql('alter table "building_component" drop column "quantity_spare";');
    this.addSql('alter table "building_component" drop column "quantity_notes";');
    this.addSql('alter table "building_component" drop column "spare_parts_notes";');
    this.addSql('alter table "building_component" drop column "construction_year_notes";');
    this.addSql('alter table "building_component" drop column "reuse_potential_notes";');
    this.addSql('alter table "building_component" drop column "reuse_potential_conclusion";');
    this.addSql('alter table "building_component" drop column "reuse_value_per_unit";');
    this.addSql('alter table "building_component" drop column "reuse_value_total";');
    this.addSql('alter table "building_component" drop column "reuse_value_description";');
    this.addSql('alter table "building_component" drop column "ru1explanation";');
    this.addSql('alter table "building_component" drop column "ru2explanation";');
    this.addSql('alter table "building_component" drop column "ru3explanation";');
    this.addSql('alter table "building_component" drop column "ru1per_unit";');
    this.addSql('alter table "building_component" drop column "ru2per_unit";');
    this.addSql('alter table "building_component" drop column "ru3per_unit";');
    this.addSql('alter table "building_component" drop column "ru_per_unit_sum";');
    this.addSql('alter table "building_component" drop column "fallback_level";');
    this.addSql('alter table "building_component" drop column "fallback_level_co2per_unit";');
    this.addSql('alter table "building_component" drop column "fallback_level_co2total";');
    this.addSql('alter table "building_component" drop column "co2savings_per_unit";');
    this.addSql('alter table "building_component" drop column "ru1total";');
    this.addSql('alter table "building_component" drop column "ru2total";');
    this.addSql('alter table "building_component" drop column "ru3total";');
    this.addSql('alter table "building_component" drop column "ru_total_sum";');
    this.addSql('alter table "building_component" drop column "co2savings_total";');
    this.addSql('alter table "building_component" drop column "co2unit";');
    this.addSql('alter table "building_component" drop column "co2quantity_used";');
    this.addSql('alter table "building_component" drop column "transport_distance_in_km";');
    this.addSql('alter table "building_component" drop column "transport_vehicle_name";');
    this.addSql('alter table "building_component" drop column "storage_location_notes";');
    this.addSql('alter table "building_component" drop column "dimensions_notes";');
    this.addSql('alter table "building_component" drop column "demolition_phase";');
    this.addSql('alter table "building_component" drop column "potential_interests";');
    this.addSql('alter table "building_component" drop column "warranty_details";');
    this.addSql('alter table "building_component" rename column "harmful_substances" to "harmfull_substances";');
  }

}
