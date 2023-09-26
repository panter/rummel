import { Migration } from '@mikro-orm/migrations';

export class Migration20230713140035 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "search_request" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "project_id" uuid not null, "responsible_user_id" uuid not null, "category_id" uuid null, "ebkph_category_id" uuid null, "building_component_name" varchar(255) null, "building_component_description" varchar(255) null, "quantity" bigint null, "quantity_unit" text check ("quantity_unit" in (\'m\', \'m2\', \'m3\', \'lfm\', \'stk\', \'kg\')) null, "deadline_found" timestamptz(0) null, "deadline_shipment" timestamptz(0) null, "notes" text null, constraint "search_request_pkey" primary key ("id"));');

    this.addSql('alter table "search_request" add constraint "search_request_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade;');
    this.addSql('alter table "search_request" add constraint "search_request_responsible_user_id_foreign" foreign key ("responsible_user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "search_request" add constraint "search_request_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade on delete set null;');
    this.addSql('alter table "search_request" add constraint "search_request_ebkph_category_id_foreign" foreign key ("ebkph_category_id") references "ebkph-category" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "search_request" cascade;');
  }

}
