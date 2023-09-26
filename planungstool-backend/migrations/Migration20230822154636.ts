import { Migration } from '@mikro-orm/migrations';

export class Migration20230822154636 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" add column "phase" text check ("phase" in (\'inventory\', \'meditation\', \'clarification\', \'disassembly\', \'release\', \'stored\', \'reused\')) not null default \'inventory\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" drop column "phase";');
  }

}
