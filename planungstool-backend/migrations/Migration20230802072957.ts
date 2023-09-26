import { Migration } from '@mikro-orm/migrations';

export class Migration20230802072957 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "project_contacts" ("project_id" uuid not null, "contact_id" uuid not null, constraint "project_contacts_pkey" primary key ("project_id", "contact_id"));');

    this.addSql('alter table "project_contacts" add constraint "project_contacts_project_id_foreign" foreign key ("project_id") references "project" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "project_contacts" add constraint "project_contacts_contact_id_foreign" foreign key ("contact_id") references "contact" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "project_contacts" cascade;');
  }

}
