import { Migration } from '@mikro-orm/migrations';

export class Migration20230717105928 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "search_request_interest" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "search_request_id" uuid not null, "responsible_user_id" uuid not null, "state" text check ("state" in (\'OPEN\', \'REJECTED\')) not null default \'OPEN\', "rejection_reason" text null, "rejected_at" timestamptz(0) null, constraint "search_request_interest_pkey" primary key ("id"));');

    this.addSql('create table "search_request_interest_building_components" ("search_request_interest_id" uuid not null, "building_component_id" uuid not null, constraint "search_request_interest_building_components_pkey" primary key ("search_request_interest_id", "building_component_id"));');

    this.addSql('alter table "search_request_interest" add constraint "search_request_interest_search_request_id_foreign" foreign key ("search_request_id") references "search_request" ("id") on update cascade;');
    this.addSql('alter table "search_request_interest" add constraint "search_request_interest_responsible_user_id_foreign" foreign key ("responsible_user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "search_request_interest_building_components" add constraint "search_request_interest_building_components_searc_f3f91_foreign" foreign key ("search_request_interest_id") references "search_request_interest" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "search_request_interest_building_components" add constraint "search_request_interest_building_components_build_47079_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "search_request_interest_building_components" drop constraint "search_request_interest_building_components_searc_f3f91_foreign";');

    this.addSql('drop table if exists "search_request_interest" cascade;');

    this.addSql('drop table if exists "search_request_interest_building_components" cascade;');
  }

}
