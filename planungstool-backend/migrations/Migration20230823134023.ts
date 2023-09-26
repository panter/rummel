import { Migration } from '@mikro-orm/migrations';

export class Migration20230823134023 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "search_request" add column "comments" text null, add column "budget_notes" text null, add column "search_concept_notes" text null, add column "hunting_status_notes" text null, add column "fire_protection_notes" text null, add column "sound_proof_notes" text null, add column "security_notes" text null, add column "fallback_level_co2per_unit" int null, add column "fallback_level_co2total" int null;');
    this.addSql('alter table "search_request" alter column "building_component_description" type text using ("building_component_description"::text);');
    this.addSql('alter table "search_request" drop column "notes";');
    this.addSql('alter table "search_request" drop column "concept";');
    this.addSql('alter table "search_request" drop column "co2total";');
    this.addSql('alter table "search_request" drop column "co2total_exact";');
    this.addSql('alter table "search_request" drop column "co2per_unit";');
    this.addSql('alter table "search_request" drop column "co2per_unit_exact";');
    this.addSql('alter table "search_request" drop column "co2balance_description";');
    this.addSql('alter table "search_request" drop column "status_hunting";');
    this.addSql('alter table "search_request" drop column "fire_protection";');
    this.addSql('alter table "search_request" drop column "sound_proof";');
    this.addSql('alter table "search_request" drop column "security";');
    this.addSql('alter table "search_request" drop column "storage_location";');
    this.addSql('alter table "search_request" drop column "location_building";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "search_request" add column "notes" text null default null, add column "concept" varchar null default null, add column "co2total" int4 null default null, add column "co2total_exact" bool null default null, add column "co2per_unit" int4 null default null, add column "co2per_unit_exact" bool null default null, add column "co2balance_description" text null default null, add column "status_hunting" varchar null default null, add column "fire_protection" varchar null default null, add column "sound_proof" varchar null default null, add column "security" varchar null default null, add column "storage_location" varchar null default null, add column "location_building" varchar null default null;');
    this.addSql('alter table "search_request" alter column "building_component_description" type varchar using ("building_component_description"::varchar);');
    this.addSql('alter table "search_request" drop column "comments";');
    this.addSql('alter table "search_request" drop column "budget_notes";');
    this.addSql('alter table "search_request" drop column "search_concept_notes";');
    this.addSql('alter table "search_request" drop column "hunting_status_notes";');
    this.addSql('alter table "search_request" drop column "fire_protection_notes";');
    this.addSql('alter table "search_request" drop column "sound_proof_notes";');
    this.addSql('alter table "search_request" drop column "security_notes";');
    this.addSql('alter table "search_request" drop column "fallback_level_co2per_unit";');
    this.addSql('alter table "search_request" drop column "fallback_level_co2total";');
  }

}
