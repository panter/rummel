import { Migration } from '@mikro-orm/migrations';

export class Migration20230822125624 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'drop table if exists "search_request_interest_building_components" cascade;',
    );

    this.addSql(
      'alter table "search_request_interest" add column "building_component_id" uuid not null;',
    );
    this.addSql(
      'alter table "search_request_interest" add constraint "search_request_interest_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'create table "search_request_interest_building_components" ("search_request_interest_id" uuid not null default null, "building_component_id" uuid not null default null, constraint "search_request_interest_building_components_pkey" primary key ("search_request_interest_id", "building_component_id"));',
    );

    this.addSql(
      'alter table "search_request_interest_building_components" add constraint "search_request_interest_building_components_build_47079_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "search_request_interest_building_components" add constraint "search_request_interest_building_components_searc_f3f91_foreign" foreign key ("search_request_interest_id") references "search_request_interest" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "building_component" drop constraint "building_component_search_request_interests_id_foreign";',
    );

    this.addSql(
      'alter table "search_request_interest" drop constraint "search_request_interest_building_component_id_foreign";',
    );

    this.addSql(
      'alter table "search_request_interest" drop column "building_component_id";',
    );
  }
}
