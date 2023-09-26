import { Migration } from '@mikro-orm/migrations';

export class Migration20230719144549 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dimension_range" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "type" varchar(255) null, "min_width" int null, "max_width" int null, "min_height" int null, "max_height" int null, "min_depth" int null, "max_depth" int null, constraint "dimension_range_pkey" primary key ("id"));');

    this.addSql('create table "search_request_dimension_ranges" ("search_request_id" uuid not null, "dimension_range_id" uuid not null, constraint "search_request_dimension_ranges_pkey" primary key ("search_request_id", "dimension_range_id"));');

    this.addSql('alter table "search_request_dimension_ranges" add constraint "search_request_dimension_ranges_search_request_id_foreign" foreign key ("search_request_id") references "search_request" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "search_request_dimension_ranges" add constraint "search_request_dimension_ranges_dimension_range_id_foreign" foreign key ("dimension_range_id") references "dimension_range" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "search_request_dimensions" cascade;');

    this.addSql('alter table "asset" add column "tags" text[] null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "search_request_dimension_ranges" drop constraint "search_request_dimension_ranges_dimension_range_id_foreign";');

    this.addSql('create table "search_request_dimensions" ("search_request_id" uuid not null default null, "dimension_id" uuid not null default null, constraint "search_request_dimensions_pkey" primary key ("search_request_id", "dimension_id"));');

    this.addSql('alter table "search_request_dimensions" add constraint "search_request_dimensions_dimension_id_foreign" foreign key ("dimension_id") references "dimension" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "search_request_dimensions" add constraint "search_request_dimensions_search_request_id_foreign" foreign key ("search_request_id") references "search_request" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "dimension_range" cascade;');

    this.addSql('drop table if exists "search_request_dimension_ranges" cascade;');

    this.addSql('alter table "asset" drop column "tags";');
  }

}
