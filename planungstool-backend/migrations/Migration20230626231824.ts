import { Migration } from '@mikro-orm/migrations';

export class Migration20230626231824 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "materials_depot" add column "created_at" timestamptz(0) not null, add column "updated_at" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "materials_depot" drop column "created_at";');
    this.addSql('alter table "materials_depot" drop column "updated_at";');
  }

}
