import { Migration } from '@mikro-orm/migrations';

export class Migration20230627160546 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "notes" varchar(255) null;');

    this.addSql('alter table "materials_depot" add column "responsable_user_id" uuid not null;');
    this.addSql('alter table "materials_depot" add constraint "materials_depot_responsable_user_id_foreign" foreign key ("responsable_user_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "materials_depot" drop column "responsable_user";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot" drop constraint "materials_depot_responsable_user_id_foreign";');

    this.addSql('alter table "materials_depot" add column "responsable_user" varchar null default null;');
    this.addSql('alter table "materials_depot" drop column "responsable_user_id";');

    this.addSql('alter table "user" drop column "notes";');
  }

}
