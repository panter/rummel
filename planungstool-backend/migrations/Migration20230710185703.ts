import { Migration } from '@mikro-orm/migrations';

export class Migration20230710185703 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "project" ("id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "type" varchar(255) null, "responsable_user_pm_id" uuid not null, "responsable_user_search_id" uuid not null, "country" varchar(255) not null default \'CH\', "city" varchar(255) null, "postal_code" varchar(255) null, "street" varchar(255) null, "notes" varchar(255) null, constraint "project_pkey" primary key ("id"));');

    this.addSql('alter table "project" add constraint "project_responsable_user_pm_id_foreign" foreign key ("responsable_user_pm_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "project" add constraint "project_responsable_user_search_id_foreign" foreign key ("responsable_user_search_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "project" cascade;');
  }

}
