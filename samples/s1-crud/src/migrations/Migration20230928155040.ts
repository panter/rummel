import { Migration } from '@mikro-orm/migrations';

export class Migration20230928155040 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" int not null default 0, "name" varchar(255) not null, constraint "user_pkey" primary key ("id", "name"));');
  }

}
