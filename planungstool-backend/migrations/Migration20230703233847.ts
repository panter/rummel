import { Migration } from '@mikro-orm/migrations';

export class Migration20230703233847 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "building_component" add column "sort_order" int not null;');
    this.addSql('alter table "building_component" alter column "show_in_matching" type boolean using ("show_in_matching"::boolean);');
    this.addSql('alter table "building_component" alter column "show_in_matching" set default false;');
    this.addSql('alter table "building_component" drop constraint "building_component_identification_unique";');
    this.addSql('alter table "building_component" drop column "identification";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" add column "identification" varchar not null default null;');
    this.addSql('alter table "building_component" alter column "show_in_matching" drop default;');
    this.addSql('alter table "building_component" alter column "show_in_matching" type bool using ("show_in_matching"::bool);');
    this.addSql('alter table "building_component" drop column "sort_order";');
    this.addSql('alter table "building_component" add constraint "building_component_identification_unique" unique ("identification");');
  }

}
