import { Migration } from '@mikro-orm/migrations';

export class Migration20230709223512 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "contact" alter column "first_name" type varchar(255) using ("first_name"::varchar(255));');
    this.addSql('alter table "contact" alter column "first_name" drop not null;');
    this.addSql('alter table "contact" alter column "last_name" type varchar(255) using ("last_name"::varchar(255));');
    this.addSql('alter table "contact" alter column "last_name" drop not null;');
    this.addSql('alter table "contact" alter column "city" type varchar(255) using ("city"::varchar(255));');
    this.addSql('alter table "contact" alter column "city" drop not null;');
    this.addSql('alter table "contact" alter column "postal_code" type varchar(255) using ("postal_code"::varchar(255));');
    this.addSql('alter table "contact" alter column "postal_code" drop not null;');
    this.addSql('alter table "contact" alter column "street" type varchar(255) using ("street"::varchar(255));');
    this.addSql('alter table "contact" alter column "street" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "contact" alter column "first_name" type varchar using ("first_name"::varchar);');
    this.addSql('alter table "contact" alter column "first_name" set not null;');
    this.addSql('alter table "contact" alter column "last_name" type varchar using ("last_name"::varchar);');
    this.addSql('alter table "contact" alter column "last_name" set not null;');
    this.addSql('alter table "contact" alter column "city" type varchar using ("city"::varchar);');
    this.addSql('alter table "contact" alter column "city" set not null;');
    this.addSql('alter table "contact" alter column "postal_code" type varchar using ("postal_code"::varchar);');
    this.addSql('alter table "contact" alter column "postal_code" set not null;');
    this.addSql('alter table "contact" alter column "street" type varchar using ("street"::varchar);');
    this.addSql('alter table "contact" alter column "street" set not null;');
  }

}
