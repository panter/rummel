import { Migration } from '@mikro-orm/migrations';

export class Migration20230726123214 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "project_assets" alter column "tenant" type varchar(255) using ("tenant"::varchar(255));');
    this.addSql('alter table "project_assets" alter column "tenant" set default \'tenant:zirkular\';');

    this.addSql('alter table "materials_depot_assets" alter column "tenant" type varchar(255) using ("tenant"::varchar(255));');
    this.addSql('alter table "materials_depot_assets" alter column "tenant" set default \'tenant:zirkular\';');

    this.addSql('alter table "building_component_assets" alter column "tenant" type varchar(255) using ("tenant"::varchar(255));');
    this.addSql('alter table "building_component_assets" alter column "tenant" set default \'tenant:zirkular\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component_assets" alter column "tenant" drop default;');
    this.addSql('alter table "building_component_assets" alter column "tenant" type varchar using ("tenant"::varchar);');

    this.addSql('alter table "materials_depot_assets" alter column "tenant" drop default;');
    this.addSql('alter table "materials_depot_assets" alter column "tenant" type varchar using ("tenant"::varchar);');

    this.addSql('alter table "project_assets" alter column "tenant" drop default;');
    this.addSql('alter table "project_assets" alter column "tenant" type varchar using ("tenant"::varchar);');
  }

}
