import { Migration } from '@mikro-orm/migrations';

export class Migration20230812080510 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "project" add column "state" text check ("state" in (\'draft\', \'active\', \'closed\')) not null default \'draft\';');

    this.addSql('alter table "search_request" add column "state" text check ("state" in (\'draft\', \'active\', \'closed\')) not null default \'draft\';');

    this.addSql('alter table "materials_depot" add column "state" text check ("state" in (\'draft\', \'active\', \'closed\')) not null default \'draft\';');

    this.addSql('alter table "building_component" add column "state" text check ("state" in (\'draft\', \'active\', \'closed\')) not null default \'draft\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" drop column "state";');

    this.addSql('alter table "materials_depot" drop column "state";');

    this.addSql('alter table "project" drop column "state";');

    this.addSql('alter table "search_request" drop column "state";');
  }

}
