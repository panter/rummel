import { Migration } from '@mikro-orm/migrations';

export class Migration20230822180102 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "project" add column "phase" text check ("phase" in (\'empty\', \'phase0\', \'phase1\')) not null default \'empty\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "project" drop column "phase";');
  }

}
