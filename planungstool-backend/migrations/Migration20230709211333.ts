import { Migration } from '@mikro-orm/migrations';

export class Migration20230709211333 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "contact" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "country" varchar(255) not null default \'CH\', "city" varchar(255) not null, "postal_code" varchar(255) not null, "street" varchar(255) not null, "type" varchar(255) null, constraint "contact_pkey" primary key ("id"));');

    this.addSql('create table "materials_depot_contacts" ("materials_depot_id" uuid not null, "contact_id" uuid not null, constraint "materials_depot_contacts_pkey" primary key ("materials_depot_id", "contact_id"));');

    this.addSql('alter table "materials_depot_contacts" add constraint "materials_depot_contacts_materials_depot_id_foreign" foreign key ("materials_depot_id") references "materials_depot" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "materials_depot_contacts" add constraint "materials_depot_contacts_contact_id_foreign" foreign key ("contact_id") references "contact" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot_contacts" drop constraint "materials_depot_contacts_contact_id_foreign";');

    this.addSql('drop table if exists "contact" cascade;');

    this.addSql('drop table if exists "materials_depot_contacts" cascade;');
  }

}
