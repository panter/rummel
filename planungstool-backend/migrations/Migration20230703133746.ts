import { Migration } from '@mikro-orm/migrations';

export class Migration20230703133746 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" add column "quantity_unit" text check ("quantity_unit" in (\'m\', \'m2\', \'m3\', \'lfm\', \'stk\', \'kg\')) null, add column "condition" text check ("condition" in (\'good\', \'fair\', \'bad\', \'unknown\')) null, add column "harmfull_substances" text check ("harmfull_substances" in (\'notToExpect\', \'suspectedPollutant\', \'pollutant\', \'noAssessment\')) null, add column "reuse_potential" text check ("reuse_potential" in (\'good\', \'fair\', \'bad\', \'unknown\')) null;');
    this.addSql('alter table "building_component" alter column "show_in_matching" drop default;');
    this.addSql('alter table "building_component" alter column "show_in_matching" type boolean using ("show_in_matching"::boolean);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" alter column "show_in_matching" type bool using ("show_in_matching"::bool);');
    this.addSql('alter table "building_component" alter column "show_in_matching" set default false;');
    this.addSql('alter table "building_component" drop column "quantity_unit";');
    this.addSql('alter table "building_component" drop column "condition";');
    this.addSql('alter table "building_component" drop column "harmfull_substances";');
    this.addSql('alter table "building_component" drop column "reuse_potential";');
  }

}
