import { Migration } from '@mikro-orm/migrations';

export class Migration20230807052316 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "assigned_building_component" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "search_request_id" uuid not null, "building_component_id" uuid not null, "amount" int not null, "amount_reserved" int not null default 0, constraint "assigned_building_component_pkey" primary key ("id"));');
    this.addSql('alter table "assigned_building_component" add constraint "assigned_building_component_building_component_id_unique" unique ("building_component_id");');

    this.addSql('alter table "assigned_building_component" add constraint "assigned_building_component_search_request_id_foreign" foreign key ("search_request_id") references "search_request" ("id") on update cascade;');
    this.addSql('alter table "assigned_building_component" add constraint "assigned_building_component_building_component_id_foreign" foreign key ("building_component_id") references "building_component" ("id") on update cascade;');

    this.addSql('alter table "search_request_interest" drop constraint if exists "search_request_interest_state_check";');

    this.addSql('alter table "search_request_interest" add column "accepted_at" timestamptz(0) null;');
    this.addSql('alter table "search_request_interest" alter column "state" type text using ("state"::text);');
    this.addSql('alter table "search_request_interest" add constraint "search_request_interest_state_check" check ("state" in (\'OPEN\', \'REJECTED\', \'ACCEPTED\'));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "assigned_building_component" cascade;');

    this.addSql('alter table "search_request_interest" drop constraint if exists "search_request_interest_state_check";');

    this.addSql('alter table "search_request_interest" alter column "state" type text using ("state"::text);');
    this.addSql('alter table "search_request_interest" add constraint "search_request_interest_state_check" check ("state" in (\'OPEN\', \'REJECTED\'));');
    this.addSql('alter table "search_request_interest" drop column "accepted_at";');
  }

}
